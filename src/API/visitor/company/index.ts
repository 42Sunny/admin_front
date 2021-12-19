export { createCompany } from './createCompany';
export { deleteCompany } from './deleteCompany';
export { enterCompanyVisitor } from './enterCompanyVisitor';
export { exitCompanyVisitor } from './exitCompanyVisitor';
export { getCompany } from './getCompany';
export { getCompanyVisitor } from './getCompanyVisitor';

export type GetCompanyVisitorArgTypes = {
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
  checkinTime: Date;
  checkoutTime: Date | null;
};
