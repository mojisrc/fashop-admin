export function get(key: string) {
  if (!key) return;
  return JSON.parse(sessionStorage.getItem(key));
}

export function set(key: string, values: any) {
  if (!key) return;
  sessionStorage.setItem(key, JSON.stringify(values));
}

export function remove(key: string) {
  if (!key) return;
  sessionStorage.removeItem(key);
}

export default {
  get,
  set,
  remove
}
