// Builds a copy of the site for the claude.ai artifact preview link.
// That host rejects top-level paths starting with "_", so Next's /_next/ assets are served from /assets/_next/.
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';

execSync('next build', { stdio: 'inherit', env: { ...process.env, ASSET_PREFIX: '/assets' } });

mkdirSync('out/assets', { recursive: true });
if (existsSync('out/assets/_next')) rmSync('out/assets/_next', { recursive: true });
renameSync('out/_next', 'out/assets/_next');

// Home-page prefetch segments; without them Next falls back to a normal page load for "/".
for (const f of readdirSync('out')) {
  if (f.startsWith('_')) rmSync(`out/${f}`, { recursive: true });
}
// The host rejects a literal U+FFFD in uploaded files; inside JS string literals the escape is equivalent.
const chunks = 'out/assets/_next/static/chunks';
for (const f of readdirSync(chunks).filter((n) => n.endsWith('.js'))) {
  const src = readFileSync(`${chunks}/${f}`, 'utf8');
  if (src.includes('\uFFFD')) writeFileSync(`${chunks}/${f}`, src.replaceAll('\uFFFD', '\\uFFFD'));
}

console.log('Preview build ready in out/');
