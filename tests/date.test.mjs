import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
import ts from 'typescript'
const source = readFileSync(new URL('../src/utils/date.ts', import.meta.url), 'utf8')
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
const mod = { exports: {} }
new Function('module', 'exports', js)(mod, mod.exports)
const { weddingCount } = mod.exports
const atShanghai = (date) => new Date(`${date}T04:00:00Z`)
test('empty and invalid dates show placeholder', () => { assert.equal(weddingCount(''), null); assert.equal(weddingCount('2026-02-30'), null) })
test('wedding day and following day', () => { assert.equal(weddingCount('2026-10-30', atShanghai('2026-10-30')).days, 0); assert.equal(weddingCount('2026-10-30', atShanghai('2026-10-31')).days, 1) })
test('future wedding and anniversary', () => { assert.deepEqual(weddingCount('2026-11-02', atShanghai('2026-10-30')), { kind: 'before', days: 3, remaining: 3, nextDate: '2026-11-02' }); assert.equal(weddingCount('2025-10-30', atShanghai('2026-10-30')).nextDate, '2027-10-30') })
test('February 29 uses February 28 in non-leap years', () => { assert.equal(weddingCount('2024-02-29', atShanghai('2025-02-27')).nextDate, '2025-02-28'); assert.equal(weddingCount('2024-02-29', atShanghai('2025-02-28')).nextDate, '2026-02-28') })
