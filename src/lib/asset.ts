/**
 * URL for a file in /public. On the normal site this is the path itself. In the static preview build
 * (served from a sub-folder) the page sets `window.__BCB_BASE__`, and client-rendered images need the
 * full URL, because a root-relative path would point outside the preview's folder.
 */
export function asset(path: string): string {
  const base = typeof window !== 'undefined' ? (window as unknown as { __BCB_BASE__?: string }).__BCB_BASE__ : undefined;
  return base ? base + path.replace(/^\//, '') : path;
}
