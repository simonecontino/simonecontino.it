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
const input = { firstName: 'Test', lastName: 'Verifica', email: 'test@example.invalid', phone: '', service: 'cpap', contactPreference: 'email', notes: '', privacy: true };
test('validates required fields, limits, privacy and selected enabled service', () => {
  assert.ok(validation.validateAppointment(input, ['cpap']));
  for (const changes of [{ privacy: false }, { email: 'invalid' }, { firstName: 'A'.repeat(61) }, { service: 'disabled' }, { contactPreference: 'phone' }, { firstName: 'Test\r\nBcc: somebody@example.invalid' }]) assert.equal(validation.validateAppointment({ ...input, ...changes }, ['cpap']), null);
});

function endpoint({ enabled = true, antiSpam = true, mail = true } = {}) {
  const calls = [];
  const { POST } = load('src/app/api/appointment-requests/route.ts', {
    'next/server': { NextResponse: { json: (body, init) => Response.json(body, init) } },
    '@/lib/booking-config': { getAppointmentConfig: () => ({ enabled, secret: 'TEST', apiKey: 'TEST', from: 'test@example.invalid', to: 'doctor@example.invalid' }) },
    '@/lib/appointment-validation': validation,
    '@/data/home-services': { homeServices: [{ id: 'cpap', title: 'CPAP', enabled: true }, { id: 'disabled', enabled: false }] },
    '@/config/site': { siteConfig: { domain: 'https://simonecontino.it' } },
  }, {
    fetch: async (url, options) => {
      calls.push({ url, options });
      return url.includes('siteverify') ? Response.json({ success: antiSpam, action: 'appointment', hostname: 'www.simonecontino.it' }) : Response.json(mail ? { id: 'test-only' } : { error: 'test' }, { status: mail ? 200 : 500 });
    },
  });
  return { POST, calls };
}
function request(body, origin = 'https://www.simonecontino.it') {
  return new Request('https://www.simonecontino.it/api/appointment-requests', { method: 'POST', headers: { 'Content-Type': 'application/json', origin }, body: JSON.stringify(body) });
}
const payload = () => ({ ...input, token: 'test-token', website: '', requestedAt: new Date().toISOString() });
test('disabled production form refuses direct POST without contacting providers', async () => {
  const e = endpoint({ enabled: false }); assert.equal((await e.POST(request(payload()))).status, 503); assert.equal(e.calls.length, 0);
});
test('rejects foreign origin, honeypot, malformed data, oversize and disabled services', async () => {
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
  assert.equal(email.subject, 'Nuova richiesta appuntamento dal sito — Test Verifica');
  assert.equal(email.reply_to, input.email);
  assert.ok(email.text.includes('Prestazione: CPAP'));
});
