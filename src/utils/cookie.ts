import { get, remove, set } from 'js-cookie';
import { PROJECT_DEFAULT_CONFIG } from '@/config';

const tokenKey = PROJECT_DEFAULT_CONFIG.tokenKey;

export function getCookie(name?: string) {
  return get(name || tokenKey);
}

export function setCookie(name: string, value: string | object) {
  set(name || tokenKey, value);
}

export function removeCookie(name?: string) {
  remove(name || tokenKey);
}
