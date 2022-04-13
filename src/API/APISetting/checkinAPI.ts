import { AxiosResponse } from 'axios';
import { checkinAPIInstance } from './instance';

export const postToCheckin = <T, R = any>(url: string, data?: T): Promise<AxiosResponse<R>> =>
  checkinAPIInstance.post<R>(url, data);
export const getToCheckin = <T, R = any>(url: string, data?: T): Promise<AxiosResponse<R>> =>
  checkinAPIInstance.get<R>(url, data);
export const putToCheckin = <T, R = any>(url: string, data?: T): Promise<AxiosResponse<R>> =>
  checkinAPIInstance.put<R>(url, data);
export const deleteToCheckin = <T, R = any>(url: string, data?: T): Promise<AxiosResponse<R>> =>
  checkinAPIInstance.delete<R>(url, data);
export const patchToCheckin = <T, R = any>(url: string, data?: T): Promise<AxiosResponse<R>> =>
  checkinAPIInstance.patch<R>(url, data);

export type CheckInResponseType<PayloadType> = {
  code: number;
  payload: PayloadType;
  result: string;
  status: number;
};
