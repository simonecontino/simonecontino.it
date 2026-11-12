/* eslint-disable @typescript-eslint/no-require-imports -- Node built-in test runner and isolated CommonJS module loader. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

// Run actual TypeScript modules with isolated provider boundaries. No email is sent.
function load(file, dependencies = {}, extra = {}) {
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require: name => name in dependencies ? dependencies[name] : require(name), Request, Response, Buffer, URL, AbortSignal, process: { env: { NODE_ENV: 'production' } }, console: { error: () => assert.fail('No request data should be logged') }, ...extra });
  return exports;
}
const validation = load('src/lib/appointment-validation.ts');
const { homeServices } = load('src/data/home-services.ts');
test('public catalogue retains exactly the four confirmed tariffs', () => {
  const services = homeServices.filter(s => s.enabled);
  assert.equal(services.length, 4);
  assert.equal(JSON.stringify(services.map(s => [s.title, s.priceEur])), JSON.stringify([
    ['Visita pneumologica domiciliare', 180],
    ['Visita domiciliare per disturbi respiratori del sonno', 180],
    ['Poligrafia notturna domiciliare', 220],
    ['Saturimetria notturna domiciliare', 100],
  ]));
  assert.ok(services.every(s => s.priceConfirmed));
  assert.ok(!services.some(s => s.id === 'controllo-cpap-domiciliare'));
});
const input = { firstName: 'Test', lastName: 'Verifica', email: 'test@example.invalid', phone: '', contactPreference: 'email', privacy: true };
test('callback validates required fields and rejects service selection and free text', () => {
  assert.ok(validation.validateAppointment(input));
  for (const changes of [{ privacy: false }, { email: 'invalid' }, { firstName: 'A'.repeat(61) }, { service: 'cpap' }, { notes: '' }, { message: 'sintomi' }, { attachments: [] }, { contactPreference: 'phone' }, { firstName: 'Test\r\nBcc: somebody@example.invalid' }]) assert.equal(validation.validateAppointment({ ...input, ...changes }), null);
});

function endpoint({ enabled = true, antiSpam = true, mail = true, challenge = {}, mailBody = { id: 'test-only' }, failNetwork = false } = {}) {
  const calls = [];
  const { handleAppointmentRequest } = load('src/lib/appointment-handler.ts', {
    'next/server': { NextResponse: { json: (body, init) => Response.json(body, init) } },
    '@/lib/booking-config': { getAppointmentConfig: () => ({ enabled, siteKey: 'TEST', secret: 'TEST', apiKey: 'TEST', from: 'test@example.invalid', to: 'doctor@example.invalid' }) },
    '@/lib/appointment-validation': validation,
    '@/data/home-services': { homeServices: [{ id: 'cpap', title: 'CPAP', enabled: true }, { id: 'disabled', enabled: false }] },
    '@/config/site': { siteConfig: { domain: 'https://simonecontino.it', email: 'drsimonecontino@gmail.com' } },
  }, {
    fetch: async (url, options) => {
      calls.push({ url, options });
      if (failNetwork) throw new Error('Simulated provider outage');
      return url.includes('siteverify') ? Response.json({ success: antiSpam, action: 'appointment', hostname: 'www.simonecontino.it', ...challenge }) : Response.json(mail ? mailBody : { error: 'test' }, { status: mail ? 200 : 500 });
    },
  });
  return { POST: handleAppointmentRequest, calls };
}
function request(body, origin = 'https://www.simonecontino.it') {
  return new Request('https://www.simonecontino.it/api/appointment-requests', { method: 'POST', headers: { 'Content-Type': 'application/json', origin }, body: JSON.stringify(body) });
}
const payload = () => ({ ...input, token: 'test-token', website: '', requestedAt: new Date().toISOString() });
test('disabled production form refuses direct POST without contacting providers', async () => {
  const e = endpoint({ enabled: false }); assert.equal((await e.POST(request(payload()))).status, 503); assert.equal(e.calls.length, 0);
});
test('rejects foreign origin, honeypot, malformed data, oversize and legacy service selection', async () => {
  const e = endpoint();
  assert.equal((await e.POST(request(payload(), 'https://foreign.invalid'))).status, 403);
  for (const v of [null, [], { ...payload(), website: 'spam' }, { ...payload(), service: 'disabled' }, { ...payload(), token: '' }]) assert.equal((await e.POST(request(v))).status, 400);
  assert.equal((await e.POST(request({ ...payload(), notes: 'x'.repeat(13_000) }))).status, 413);
  assert.equal(e.calls.length, 0);
});
test('failed challenge never reaches email provider', async () => {
  const e = endpoint({ antiSpam: false }); assert.equal((await e.POST(request(payload()))).status, 400); assert.equal(e.calls.length, 1);
});
test('provider error returns retryable error, never false success', async () => {
  const e = endpoint({ mail: false }); assert.equal((await e.POST(request(payload()))).status, 502);
});
test('success includes all email fields and stable idempotency for retries', async () => {
  const e = endpoint(); const p = payload();
  assert.equal((await e.POST(request(p))).status, 200);
  assert.equal((await e.POST(request(p))).status, 200);
  const first = e.calls[1]; const second = e.calls[3];
  assert.equal(first.options.headers['Idempotency-Key'], second.options.headers['Idempotency-Key']);
  assert.equal(first.options.body, second.options.body);
  const email = JSON.parse(first.options.body);
  assert.equal(email.subject, 'Nuova richiesta di ricontatto — Dr. Simone Contino');
  assert.equal(email.reply_to, input.email);
  assert.ok(email.text.includes('Preferenza: Email'));
  assert.ok(!email.text.includes('Prestazione:'));
  assert.ok(!email.text.includes('Note organizzative:'));
});

test('challenge must belong to the expected hostname and action', async () => {
  for (const challenge of [{ hostname: 'foreign.invalid' }, { action: 'other' }, { success: false }]) {
    const e = endpoint({ challenge });
    assert.equal((await e.POST(request(payload()))).status, 400);
    assert.equal(e.calls.length, 1);
  }
});

test('expired requests, absent privacy acknowledgement and oversized tokens never reach providers', async () => {
  const e = endpoint();
  for (const changes of [{ privacy: false }, { token: 'x'.repeat(2049) }, { requestedAt: 'not-a-date' }, { requestedAt: new Date(Date.now() - 90000000).toISOString() }]) {
    assert.equal((await e.POST(request({ ...payload(), ...changes }))).status, 400);
  }
  assert.equal(e.calls.length, 0);
});

test('malformed JSON and non-JSON requests fail before external calls', async () => {
  const e = endpoint();
  const headers = { origin: 'https://www.simonecontino.it', 'Content-Type': 'application/json' };
  assert.equal((await e.POST(new Request('https://www.simonecontino.it/api/appointment-requests', { method: 'POST', headers, body: '{bad' }))).status, 400);
  assert.equal((await e.POST(new Request('https://www.simonecontino.it/api/appointment-requests', { method: 'POST', headers: { ...headers, 'Content-Type': 'text/plain' }, body: '{}' }))).status, 415);
  assert.equal(e.calls.length, 0);
});

test('network failure and missing provider receipt never display successful submission', async () => {
  const offline = endpoint({ failNetwork: true });
  assert.equal((await offline.POST(request(payload()))).status, 502);
  for (const mailBody of [{}, { id: '' }, null]) {
    const e = endpoint({ mailBody });
    assert.equal((await e.POST(request(payload()))).status, 502);
  }
});

test('readiness requires every flag and credential; email success alone does not enable the form', () => {
  const env = { APPOINTMENT_FORM_ENABLED: 'true', APPOINTMENT_OWNER_APPROVED: 'true', APPOINTMENT_EMAIL_VERIFIED: 'true', RESEND_API_KEY: 'TEST', APPOINTMENT_FROM_EMAIL: 'test@example.invalid', APPOINTMENT_TO_EMAIL: 'doctor@example.invalid', TURNSTILE_SITE_KEY: 'TEST', TURNSTILE_SECRET_KEY: 'TEST' };
  function config(settings) {
    return load('src/lib/booking-config.ts', {
      'server-only': {}, '@/config/booking': { booking: { whatsappMessage: 'Test' } }, '@/config/site': { siteConfig: { email: 'doctor@example.invalid' } },
    }, { process: { env: settings } }).getAppointmentConfig();
  }
  assert.equal(config(env).enabled, true);
  const pasted = config({ ...env, RESEND_API_KEY: ' TEST\n', APPOINTMENT_FROM_EMAIL: ' test@example.invalid\r\n', APPOINTMENT_TO_EMAIL: ' doctor@example.invalid\n', TURNSTILE_SITE_KEY: ' TEST\n\n', TURNSTILE_SECRET_KEY: ' TEST\r\n' });
  assert.equal(pasted.siteKey, 'TEST');
  assert.equal(pasted.secret, 'TEST');
  assert.equal(pasted.apiKey, 'TEST');
  assert.equal(pasted.from, 'test@example.invalid');
  assert.equal(pasted.to, 'doctor@example.invalid');
  assert.equal(pasted.enabled, true);
  assert.equal(config({ ...env, TURNSTILE_SITE_KEY: '\r\n ' }).enabled, false);
  for (const key of ['APPOINTMENT_FORM_ENABLED', 'APPOINTMENT_OWNER_APPROVED', 'APPOINTMENT_EMAIL_VERIFIED', 'RESEND_API_KEY', 'APPOINTMENT_FROM_EMAIL', 'TURNSTILE_SITE_KEY', 'TURNSTILE_SECRET_KEY']) {
    assert.equal(config({ ...env, [key]: '' }).enabled, false);
  }
  assert.equal(config({ ...env, APPOINTMENT_OWNER_APPROVED: 'false', APPOINTMENT_PRIVACY_VERIFIED: 'true' }).enabled, false);
});
