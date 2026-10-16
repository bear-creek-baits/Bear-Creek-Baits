// Runs after `next build`. The static export writes each page's client-navigation data under a folder,
// e.g. about/__next.about/__PAGE__.txt, but the browser requests it as a flat file,
// about/__next.about.__PAGE__.txt. A plain static host can't map one to the other, so every link
// prefetch 404s and each click becomes a full page reload. This writes the flat copies next to the
// folders (the folders stay, in case a host does map them).
import { copyFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const OUT = 'out';

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

let copied = 0;
for (const file of walk(OUT)) {
  const parts = relative(OUT, file).split(sep);
  const i = parts.findIndex((p) => p.startsWith('__next.'));
  if (i === -1 || i === parts.length - 1) continue; // not inside a __next.* folder
  const flat = join(OUT, ...parts.slice(0, i), parts.slice(i).join('.'));
  if (!existsSync(flat)) {
    copyFileSync(file, flat);
    copied++;
  }
}
console.log(`flatten-rsc: wrote ${copied} navigation data files`);
