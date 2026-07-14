/**
 * Runnable self-check for the terminal command parser.
 * No framework — run with:  npx tsx src/components/terminal-engine.test.ts
 */
import assert from 'node:assert'

import { runCommand } from './terminal-engine'

// empty input is a no-op
assert.deepEqual(runCommand('   '), { lines: [] })

// clear / exit emit actions, no output
assert.equal(runCommand('clear').action?.kind, 'clear')
assert.equal(runCommand('exit').action?.kind, 'close')

// open routes to the project detail page
const routed = runCommand('open autoworx')
assert.deepEqual(routed.action, { kind: 'route', to: '/projects/autoworx' })

// open --live opens the external URL
const live = runCommand('open autoworx --live')
assert.equal(live.action?.kind, 'open')
assert.ok(live.action?.kind === 'open' && live.action.url.startsWith('http'))

// unknown project is an error with no action
const missing = runCommand('open nope')
assert.equal(missing.action, undefined)
assert.equal(missing.lines[0].tone, 'error')

// email copies to clipboard
assert.equal(runCommand('email').action?.kind, 'copy')

// garbage → command-not-found, no action
const bad = runCommand('foobar')
assert.equal(bad.action, undefined)
assert.match(bad.lines[0].text, /command not found/)

// case-insensitive
assert.equal(runCommand('HELP').lines.length > 0, true)

console.log('✓ terminal-engine: all checks passed')
