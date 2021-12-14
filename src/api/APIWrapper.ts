import { Method } from 'axios';
import { checkinAPIHandler, visitorAPIHandler } from './APIHandler';

export const visitorAPIWrapper = async <ArgDataType>(
  method: Method,
  path: string,
  data: ArgDataType,
) => {
  try {
    const result = await visitorAPIHandler(method, path, data);
    return { data: result.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const checkinAPIWrapper = async <ArgDataType>(
  method: Method,
  path: string,
  data: ArgDataType,
) => {
  try {
    const result = await checkinAPIHandler(method, path, data);
    return { data: result.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
