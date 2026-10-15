/**
 * In-app navigation. The static preview build (served from a sub-folder) injects
 * `window.__bcbUrl`, which maps a site path to a real file URL; there we do a full page load.
 */
type Router = { push: (href: string) => void };

export function navigate(router: Router, href: string) {
  const toFile = (window as unknown as { __bcbUrl?: (h: string) => string }).__bcbUrl;
  if (toFile) window.location.assign(toFile(href));
  else router.push(href);
}
