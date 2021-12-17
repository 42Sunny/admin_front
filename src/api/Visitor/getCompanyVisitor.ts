import { authPostToVisitor, makeAPIPath } from 'API/visitorApi';

export type GetCompanyVisitorArgTypes = {
  start: Date;
  end: Date;
  pagination: {
    page: number;
    size: number;
  };
};
export const getCompanyVisitor = (arg: GetCompanyVisitorArgTypes) =>
  authPostToVisitor<GetCompanyVisitorArgTypes>(makeAPIPath('/company/visitor/date'), arg);
