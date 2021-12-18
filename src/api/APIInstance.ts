import axios from 'axios';
import { env } from 'env/env';
import forceLogout from 'utils/forceLogout';
import { isExpiredCookie } from 'utils/isExpiredCookie';

const APIInstance = (baseURL?: string, x_42cadet_auth_key?: string) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      'X-42Cadet-Auth-Key': x_42cadet_auth_key,
    },
  });

  instance.interceptors.request.use(
    (request) => {
      if (isExpiredCookie()) {
        forceLogout();
        throw new Error('쿠키가 만료되었습니다.');
      }
      return request;
    },
    (error) => {
      return error;
    },
  );

  return instance;
};

export const visitorAPIInstance = APIInstance(env.API_URL.visitor, env.x_42cadet_key.visitor);
export const checkinAPIInstance = APIInstance(env.API_URL.checkin, env.x_42cadet_key.checkin);
