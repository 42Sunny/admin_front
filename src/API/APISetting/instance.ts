import axios from 'axios';
import { env } from 'env/env';
import forceLogout from 'utils/forceLogout';
import { isExpiredCookie } from 'utils/isExpiredCookie';
const VISITOR_VERSION_PATH = '/v1';

const APIInstance = (baseURL?: string, x_42cadet_auth_key?: string) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      'X-42Cadet-Auth-Key': x_42cadet_auth_key,
    },
  });

  return instance;
};

export const visitorAPIInstance = APIInstance(
  `${env.API_URL.visitor}${VISITOR_VERSION_PATH}`,
  env.x_42cadet_key.visitor,
);

visitorAPIInstance.interceptors.request.use(
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

export const checkinAPIInstance = APIInstance(env.API_URL.checkin, env.x_42cadet_key.checkin);
