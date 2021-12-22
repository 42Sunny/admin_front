export { createCompanyInfo } from './createCompanyInfo';
export { deleteCompanyInfo } from './deleteCompanyInfo';
export { enterCompanyVisitor } from './enterCompanyVisitor';
export { exitCompanyVisitor } from './exitCompanyVisitor';
export { getCompanyInfo } from './getCompanyInfo';
export { getCompanyVisitor } from './getCompanyVisitor';

export type GetCompanyVisitorArgType = {
  start: Date;
  end: Date;
  pagination: {
    page: number;
    size: number;
  };
};
export type GetCompanyVisitorResponseType = {
  id: number;
  companyName: string;
  name: string;
  place: string;
  checkIn: Date;
  checkOut: Date | null;
};

export type ExitCompanyVisitorArgType = string;
export type ExitCompanyVisitorResponseType = undefined;

export type EnterCompanyVisitorArgType = {
  place: string;
  companyId: number;
  visitorName: string;
};
export type EnterCompanyVisitorResponseType = undefined;

export type CreateCompanyInfoArgType = {
  name: string;
  phone: string;
};
export type CreateCompanyInfoResponseType = undefined;

export type GetCompanyInfoArgType = undefined;
export type GetCompanyInfoResponseType = { id: number; name: string; phone: string };

export type DeleteCompanyInfoArgType = string;
export type DeleteCompanyInfoResponseType = undefined;
