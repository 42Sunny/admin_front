import { env } from 'env/env';
import getCookieValue from './getCookieValue';

export const isExpiredCookie = (cookieKey = env.auth_key) => {
  const value = getCookieValue(cookieKey);
  return value === '';
};
