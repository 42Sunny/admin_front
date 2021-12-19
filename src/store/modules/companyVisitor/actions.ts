import { GetCompanyVisitorArgTypes, GetCompanyVisitorResponseType } from 'API/visitor/company';
import { AxiosError } from 'axios';
import { createAction, createAsyncAction } from 'typesafe-actions';

export const SET_COMPANY_VISITOR = 'companyVisitor/SET_COMPANY_VISITOR' as const;
export const GET_POST = 'companyVisitor/GET_POST' as const;
export const GET_POST_SUCCESS = 'companyVisitor/GET_POST_SUCCESS' as const;
export const GET_POST_ERROR = 'companyVisitor/GET_POST_ERROR' as const;

export const setCompanyVisitorAction =
  createAction(SET_COMPANY_VISITOR)<GetCompanyVisitorResponseType[]>();
export const getCompanyVisitorAction = createAsyncAction(
  GET_POST,
  GET_POST_SUCCESS,
  GET_POST_ERROR,
)<GetCompanyVisitorArgTypes, GetCompanyVisitorResponseType, AxiosError>();
