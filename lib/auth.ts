const COOKIE_NAME = 'admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 8;

type SessionPayload = { sub: string; phone: string; iat: number; exp: number };

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) throw new Error('JWT_SECRET must contain at least 32 characters.');
  return secret;
}

function encode(value: string) {
  return btoa(unescape(encodeURIComponent(value))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decode(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  return decodeURIComponent(escape(atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='))));
}

async function signingKey() {
  return crypto.subtle.importKey('raw', new TextEncoder().encode(getSecret()), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

export async function createSessionToken(admin: { id: string; phone: string }) {
  const now = Math.floor(Date.now() / 1000);
  const payload = encode(JSON.stringify({ sub: admin.id, phone: admin.phone, iat: now, exp: now + SESSION_TTL_SECONDS }));
  const signature = await crypto.subtle.sign('HMAC', await signingKey(), new TextEncoder().encode(payload));
  return `${payload}.${encode(String.fromCharCode(...Array.from(new Uint8Array(signature))))}`;
}

export async function verifySessionToken(token?: string): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const [payload, signature, extra] = token.split('.');
    if (!payload || !signature || extra) return null;
    const signatureBytes = Uint8Array.from(decode(signature), (character) => character.charCodeAt(0));
    const valid = await crypto.subtle.verify('HMAC', await signingKey(), signatureBytes, new TextEncoder().encode(payload));
    if (!valid) return null;
    const parsed = JSON.parse(decode(payload)) as SessionPayload;
    return parsed.sub && parsed.phone && parsed.exp > Math.floor(Date.now() / 1000) ? parsed : null;
  } catch {
    return null;
  }
}

export function readSessionCookie(request: Request) {
  const match = (request.headers.get('cookie') ?? '').match(/(?:^|;\s*)admin_session=([^;]+)/);
  return match?.[1];
}

export async function isAuthenticated(request: Request) {
  return Boolean(await verifySessionToken(readSessionCookie(request)));
}

export const sessionCookie = {
  name: COOKIE_NAME,
  options: { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' as const, path: '/', maxAge: SESSION_TTL_SECONDS },
};
