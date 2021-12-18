import { postToVisitor, makeAPIPath } from 'API/visitorApi';

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
export const getCompanyVisitor = (arg: GetCompanyVisitorArgTypes) =>
  postToVisitor<GetCompanyVisitorArgTypes, GetCompanyVisitorResponseType>(
    makeAPIPath('/company/visitor/date'),
    arg,
  );
