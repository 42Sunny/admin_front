import {
  EnterCompanyVisitorArgType,
  EnterCompanyVisitorResponseType,
  GetCompanyVisitorArgType,
  GetCompanyVisitorResponseType,
} from 'API/visitor/company';
import { ExitCompanyVisitorArgType, ExitCompanyVisitorResponseType } from 'API/visitor/company';
import { AxiosError } from 'axios';
import { createAction, createAsyncAction } from 'typesafe-actions';

export const SET_COMPANY_VISITOR = 'companyVisitor/SET_COMPANY_VISITOR' as const;

export const GET_COMPANY_VISITOR = 'companyVisitor/GET_COMPANY_VISITOR' as const;
export const GET_COMPANY_VISITOR_SUCCESS = 'companyVisitor/GET_COMPANY_VISITOR_SUCCESS' as const;
export const GET_COMPANY_VISITOR_ERROR = 'companyVisitor/GET_COMPANY_VISITOR_ERROR' as const;

export const EXIT_COMPANY_VISITOR = 'companyVisitor/EXIT_COMPANY_VISITOR' as const;
export const EXIT_COMPANY_VISITOR_SUCCESS = 'companyVisitor/EXIT_COMPANY_VISITOR_SUCCESS' as const;
export const EXIT_COMPANY_VISITOR_ERROR = 'companyVisitor/EXIT_COMPANY_VISITOR_ERROR' as const;

export const ENTER_COMPANY_VISITOR = 'companyInfo/ENTER_COMPANY_VISITOR' as const;
export const ENTER_COMPANY_VISITOR_SUCCESS = 'companyInfo/ENTER_COMPANY_VISITOR_SUCCESS' as const;
export const ENTER_COMPANY_VISITOR_ERROR = 'companyInfo/ENTER_COMPANY_VISITOR_ERROR' as const;

export const setCompanyVisitorAction =
  createAction(SET_COMPANY_VISITOR)<GetCompanyVisitorResponseType[]>();

export const getCompanyVisitorAction = createAsyncAction(
  GET_COMPANY_VISITOR,
  GET_COMPANY_VISITOR_SUCCESS,
  GET_COMPANY_VISITOR_ERROR,
)<GetCompanyVisitorArgType, GetCompanyVisitorResponseType[], AxiosError>();

export const exitCompanyVisitorAction = createAsyncAction(
  EXIT_COMPANY_VISITOR,
  EXIT_COMPANY_VISITOR_SUCCESS,
  EXIT_COMPANY_VISITOR_ERROR,
)<ExitCompanyVisitorArgType, ExitCompanyVisitorResponseType, AxiosError>();

export const enterCompanyVisitorAction = createAsyncAction(
  ENTER_COMPANY_VISITOR,
  ENTER_COMPANY_VISITOR_SUCCESS,
  ENTER_COMPANY_VISITOR_ERROR,
)<EnterCompanyVisitorArgType, EnterCompanyVisitorResponseType, AxiosError>();
