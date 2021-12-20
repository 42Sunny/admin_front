import {
  CreateCompanyInfoArgType,
  CreateCompanyInfoResponseType,
  DeleteCompanyInfoArgType,
  DeleteCompanyInfoResponseType,
  GetCompanyInfoArgType,
  GetCompanyInfoResponseType,
} from 'API/visitor/company';
import { AxiosError } from 'axios';
import { createAction, createAsyncAction } from 'typesafe-actions';

export const SET_COMPANY_INFO = 'companyInfo/SET_COMPANY_INFO' as const;

export const GET_COMPANY_INFO = 'companyInfo/GET_COMPANY_INFO' as const;
export const GET_COMPANY_INFO_SUCCESS = 'companyInfo/GET_COMPANY_INFO_SUCCESS' as const;
export const GET_COMPANY_INFO_ERROR = 'companyInfo/GET_COMPANY_INFO_ERROR' as const;

export const CREATE_COMPANY_INFO = 'companyInfo/CREATE_COMPANY_INFO' as const;
export const CREATE_COMPANY_INFO_SUCCESS = 'companyInfo/CREATE_COMPANY_INFO_SUCCESS' as const;
export const CREATE_COMPANY_INFO_ERROR = 'companyInfo/CREATE_COMPANY_INFO_ERROR' as const;

export const DELETE_COMPANY_INFO = 'companyInfo/DELETE_COMPANY_INFO' as const;
export const DELETE_COMPANY_INFO_SUCCESS = 'companyInfo/DELETE_COMPANY_INFO_SUCCESS' as const;
export const DELETE_COMPANY_INFO_ERROR = 'companyInfo/DELETE_COMPANY_INFO_ERROR' as const;

export const setCompanyInfoAction = createAction(SET_COMPANY_INFO)<GetCompanyInfoResponseType[]>();

export const getCompanyInfoAction = createAsyncAction(
  GET_COMPANY_INFO,
  GET_COMPANY_INFO_SUCCESS,
  GET_COMPANY_INFO_ERROR,
)<GetCompanyInfoArgType, GetCompanyInfoResponseType[], AxiosError>();

export const createCompanyInfoAction = createAsyncAction(
  CREATE_COMPANY_INFO,
  CREATE_COMPANY_INFO_SUCCESS,
  CREATE_COMPANY_INFO_ERROR,
)<CreateCompanyInfoArgType, CreateCompanyInfoResponseType, AxiosError>();

export const deleteCompanyInfoAction = createAsyncAction(
  DELETE_COMPANY_INFO,
  DELETE_COMPANY_INFO_SUCCESS,
  DELETE_COMPANY_INFO_ERROR,
)<DeleteCompanyInfoArgType, DeleteCompanyInfoResponseType, AxiosError>();
