import axios from 'axios';
import { env } from 'env/env';

const APIInstance = (baseURL?: string, x_42cadet_auth_key?: string) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      'X-42Cadet-Auth-Key': x_42cadet_auth_key,
    },
  });

  instance.interceptors.response.use(
    (response) => {
      return { ...response, error: null };
    },
    (error) => {
      return Promise.reject({ data: { error } });
    },
  );

  return instance;
};

export const visitorAPIInstance = APIInstance(env.API_URL.visitor, env.x_42cadet_key.visitor);
export const checkinAPIInstance = APIInstance(env.API_URL.checkin, env.x_42cadet_key.checkin);
