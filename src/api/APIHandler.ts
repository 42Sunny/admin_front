import axios, { Method } from 'axios';
import { env } from 'env/env';

const APIHandler =
  (baseURL?: string, x_42cadet_auth_key?: string) =>
  async <ArgDataType>(method: Method, path: string, data: ArgDataType) =>
    await axios({
      method,
      url: path,
      baseURL,
      data,
      headers: {
        'X-42Cadet-Auth-Key': x_42cadet_auth_key,
        cookie: document.cookie,
      },
      withCredentials: true,
    });

export const visitorAPIHandler = APIHandler(env.API_URL.visitor, env.x_42cadet_key.visitor);
export const checkinAPIHandler = APIHandler(env.API_URL.checkin, env.x_42cadet_key.checkin);
