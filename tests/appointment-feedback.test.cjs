/* eslint-disable @typescript-eslint/no-require-imports -- Isolated component tests with mocked network and hooks. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function harness() {
  const states = [], refs = [];
  let stateIndex = 0, refIndex = 0, resolveResponse, calls = 0;
  const response = new Promise(resolve => { resolveResponse = resolve; });
  const hooks = {
    useState(initial) {
      const index = stateIndex++;
      if (!(index in states)) states[index] = index === 1 ? 'mock-token' : initial;
      return [states[index], value => { states[index] = value; }];
    },
    useRef(initial) { const index = refIndex++; return refs[index] ??= { current: initial }; },
    useEffect() {},
  };
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync('src/components/forms/appointment-form.tsx', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  vm.runInNewContext(code, {
    exports,
    require: name => name === 'react' ? hooks : name === 'next/link' || name === 'next/script' ? { default: 'span' } : name === '@/lib/appointment-validation' ? { fieldLimits: {}, validateAppointment: () => true } : require(name),
    FormData: class { get(name) { return { firstName: 'Test', lastName: 'Locale', email: 'test@example.invalid', service: 'televisita-pneumologica', privacy: 'on' }[name] ?? ''; } },
    fetch: () => { calls++; return response; },
    window: {}, Date, Error,
  });
  function render() { stateIndex = 0; refIndex = 0; return exports.AppointmentForm({ enabled: true, siteKey: 'mock', services: [{ id: 'televisita-pneumologica', title: 'Televisita pneumologica' }] }); }
  function nodes(tree) { if (!tree || typeof tree !== 'object') return []; return [tree, ...[tree.props?.children].flat(Infinity).flatMap(nodes)]; }
  function find(tree, type) { return nodes(tree).find(node => node.type === type); }
  function text(tree) { if (tree == null || typeof tree === 'boolean') return ''; if (typeof tree !== 'object') return String(tree); return [tree.props?.children].flat(Infinity).map(text).join(''); }
  return { render, find, text, calls: () => calls, respond: resolveResponse };
}

test('feedback waits for application success and blocks duplicates while sending', async () => {
  const h = harness();
  let tree = h.render();
  assert.doesNotMatch(h.text(tree), /Richiesta inviata con successo/);
  const pending = h.find(tree, 'form').props.onSubmit({ preventDefault() {}, currentTarget: {} });
  tree = h.render();
  assert.equal(h.find(tree, 'button').props.disabled, true);
  assert.equal(h.find(tree, 'form').props['aria-busy'], true);
  assert.match(h.text(tree), /Invio in corso/);
  await h.find(tree, 'form').props.onSubmit({ preventDefault() {}, currentTarget: {} });
  assert.equal(h.calls(), 1);
  assert.doesNotMatch(h.text(tree), /Richiesta inviata con successo/);
  h.respond({ ok: true, json: async () => ({ ok: true }) });
  await pending;
  tree = h.render();
  assert.match(h.text(tree), /Richiesta inviata con successo!/);
  assert.equal(tree.props.style, undefined, 'Success must not retain an artificial form height');
  assert.match(h.text(tree), /La richiesta non costituisce conferma di appuntamento/);
  assert.equal(h.find(tree, 'form'), undefined);
  assert.ok(h.find(tree, 'svg'));
});

test('HTTP and application failures keep the same form without success or technical details', async () => {
  for (const [httpOk, body] of [[false, { ok: true }], [true, { ok: false, error: 'private provider detail' }], [true, { ok: 'true' }]]) {
    const h = harness();
    const tree = h.render();
    const pending = h.find(tree, 'form').props.onSubmit({ preventDefault() {}, currentTarget: {} });
    h.respond({ ok: httpOk, json: async () => body });
    await pending;
    const after = h.render();
    assert.ok(h.find(after, 'form'));
    assert.equal(h.find(after, 'button').props.disabled, false);
    assert.match(h.text(after), /Non è stato possibile inviare la richiesta/);
    assert.doesNotMatch(h.text(after), /private provider detail|Richiesta inviata con successo/);
    assert.equal(h.find(after, 'svg'), undefined);
    assert.equal(h.find(after, 'input').props.name, h.find(tree, 'input').props.name);
  }
});
