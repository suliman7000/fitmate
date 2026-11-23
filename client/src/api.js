// كل ما يخص الاتصال بالسيرفر وتسجيل الدخول (التوكن) موجود هون
const API = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api';

let token = localStorage.getItem('fitmate_token') || '';

export const getToken = () => token;

export const setToken = t => {
  token = t;
  t ? localStorage.setItem('fitmate_token', t) : localStorage.removeItem('fitmate_token');
};

export class AuthError extends Error {}

export async function api(path, opts = {}) {
  const r = await fetch(API + path, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {})
    }
  });
  const d = await r.json().catch(() => ({}));
  if (r.status === 401 && path !== '/login') {
    setToken('');
    throw new AuthError(d.error || 'انتهت الجلسة، سجّل الدخول من جديد');
  }
  if (!r.ok) throw new Error(d.error || 'Request failed');
  return d;
}
