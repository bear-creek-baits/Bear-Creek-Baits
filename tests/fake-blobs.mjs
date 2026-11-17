// In-memory stand-in for @netlify/blobs, for local tests.
const data = (globalThis.__blobs ??= new Map());
export function getStore({ name }) {
  const k = (key) => `${name}:${key}`;
  return {
    async setJSON(key, v) {
      data.set(k(key), JSON.stringify(v));
    },
    async set(key, v) {
      data.set(k(key), v);
    },
    async get(key, { type } = {}) {
      if (!data.has(k(key))) return null;
      const v = data.get(k(key));
      return type === 'json' ? JSON.parse(v) : v;
    },
    async delete(key) {
      data.delete(k(key));
    },
    async list({ prefix = '' } = {}) {
      return { blobs: [...data.keys()].filter((x) => x.startsWith(`${name}:${prefix}`)).map((x) => ({ key: x.slice(name.length + 1) })) };
    },
  };
}
