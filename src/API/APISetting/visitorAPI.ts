import { AxiosResponse } from 'axios';
import { visitorAPIInstance } from './instance';

export const postToVisitor = <T, R = any>(url: string, data?: T): Promise<AxiosResponse<R>> =>
  visitorAPIInstance.post<R>(url, data);
export const getToVisitor = <T, R = any>(url: string, data?: T): Promise<AxiosResponse<R>> =>
  visitorAPIInstance.get<R>(url, data);
export const putToVisitor = <T, R = any>(url: string, data?: T): Promise<AxiosResponse<R>> =>
  visitorAPIInstance.put<R>(url, data);
export const deleteToVisitor = <T, R = any>(url: string, data?: T): Promise<AxiosResponse<R>> =>
  visitorAPIInstance.delete<R>(url, data);
export const patchToVisitor = <T, R = any>(url: string, data?: T): Promise<AxiosResponse<R>> =>
  visitorAPIInstance.patch<R>(url, data);
