// Builds a copy of the site for the claude.ai preview link.
//
// That host serves the files from a sub-folder (not the root of a domain), rejects top-level
// paths starting with "_" and rejects a literal U+FFFD. So this build:
//   - moves Next's /_next/ files to assets/_next/
//   - makes every file and link path in each HTML page (including product photo src attributes) relative to that page (its depth is
//     known at build time), and points Turbopack's chunk loader at the site folder at runtime
//   - turns in-site link clicks into full page loads of the matching index.html, and opens each
//     page at the top (scrollIntoView also scrolls the viewer around the page when it can)
//   - drops the client-navigation data files (.txt), which this mode doesn't use, and stops link
//     prefetching from requesting them (otherwise every link logs a 404 in the console)
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const OUT = 'out';

execSync('next build', { stdio: 'inherit', env: { ...process.env, ASSET_PREFIX: '/assets' } });

mkdirSync(`${OUT}/assets`, { recursive: true });
if (existsSync(`${OUT}/assets/_next`)) rmSync(`${OUT}/assets/_next`, { recursive: true });
renameSync(`${OUT}/_next`, `${OUT}/assets/_next`);

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

for (const f of walk(OUT)) {
  const name = f.split(sep).pop();
  if (name.endsWith('.txt') && name !== 'robots.txt') rmSync(f);
}
for (const f of readdirSync(OUT)) {
  if (f.startsWith('_')) rmSync(`${OUT}/${f}`, { recursive: true });
}

/** "/shop/?q=x" -> "shop/index.html?q=x" (relative to the site folder). */
function toFile(href) {
  const i = href.search(/[?#]/);
  let path = (i < 0 ? href : href.slice(0, i)).slice(1);
  const rest = i < 0 ? '' : href.slice(i);
  if (path === '' || path.endsWith('/')) path += 'index.html';
  return path + rest;
}

// Runs first on every page. REL/UP are the page's depth back to the site folder ("./" or "", "../", ...).
// Turbopack's chunk base must be the same relative string the page's <script src> attributes use.
const boot = (rel, up) => `<script>(function(){
var keep=new URLSearchParams(location.search);keep.delete("q");keep.delete("color");
var b=new URL(${JSON.stringify(rel)},location.href.split(/[?#]/)[0]).href;
window.__BCB_BASE__=b;window.TURBOPACK_CHUNK_BASE_PATH=${JSON.stringify(up + "assets/_next/")};
function m(h){if(h.charAt(0)!=="/"||h.charAt(1)==="/")return h;var i=h.search(/[?#]/),p=(i<0?h:h.slice(0,i)).slice(1),r=i<0?"":h.slice(i);
if(p===""||p.slice(-1)==="/")p+="index.html";var u=new URL(p+r,b);keep.forEach(function(v,k){if(!u.searchParams.has(k))u.searchParams.set(k,v)});return u.href}
window.__bcbUrl=m;
var F=window.fetch;window.fetch=function(i){var u=i&&typeof i==="object"&&"url" in i?i.url:String(i);
if(u.indexOf("_rsc=")>-1)return Promise.reject(new TypeError("preview: no client navigation data"));return F.apply(this,arguments)};
addEventListener("click",function(e){if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
var a=e.target&&e.target.closest&&e.target.closest("a[href]");if(!a||a.target==="_blank")return;var h=a.getAttribute("href");
if(!h||h.charAt(0)==="#"||/^[a-z]+:/i.test(h))return;var u=h.charAt(0)==="/"?m(h):m("/"+a.href.split(/[?#]/)[0].slice(b.length)+(a.href.match(/[?#].*$/)||[""])[0]);
e.preventDefault();e.stopImmediatePropagation();location.assign(u)},true);
function top(){var h=document.documentElement,sp=h.style.scrollPaddingTop;h.style.scrollPaddingTop="0px";
scrollTo({top:0,behavior:"instant"});try{h.scrollIntoView({block:"start",behavior:"instant"})}catch(x){}h.style.scrollPaddingTop=sp}
if(!location.hash){addEventListener("DOMContentLoaded",top);addEventListener("load",top)}})();</script>`;

let pages = 0;
for (const f of walk(OUT).filter((p) => p.endsWith('.html'))) {
  const depth = relative(OUT, f).split(sep).length - 1;
  const up = '../'.repeat(depth);
  const rel = up || './';
  let html = readFileSync(f, 'utf8');
  html = html
    .replaceAll('/assets/_next/', `${up}assets/_next/`)
    .replaceAll('"/brand/', `"${up}brand/`)
    .replaceAll('src="/products/', `src="${up}products/`)
    .replaceAll('"/favicon.ico"', `"${up}favicon.ico"`)
    .replaceAll('"/manifest.webmanifest"', `"${up}manifest.webmanifest"`)
    .replace(/href="\/(?!\/)([^"]*)"/g, (_, p) => `href="${up}${toFile('/' + p)}"`)
    .replace('<meta charSet="utf-8"/>', `<meta charSet="utf-8"/>${boot(rel, up)}`);
  writeFileSync(f, html);
  pages++;
}

// The host rejects a literal U+FFFD in uploaded files; inside JS string literals the escape is equivalent.
const chunks = `${OUT}/assets/_next/static/chunks`;
for (const f of readdirSync(chunks).filter((n) => n.endsWith('.js'))) {
  const src = readFileSync(`${chunks}/${f}`, 'utf8');
  if (src.includes('\uFFFD')) writeFileSync(`${chunks}/${f}`, src.replaceAll('\uFFFD', '\\uFFFD'));
}

console.log(`Preview build ready in ${OUT}/ (${pages} pages, ${walk(OUT).length} files)`);
