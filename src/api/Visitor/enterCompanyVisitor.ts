import { authPostToVisitor, makeAPIPath } from 'API/visitorApi';

type ArgTypes = {
  place: string;
  companyId: number;
  visitorName: string;
};
export const enterCompanyVisitor = (arg: ArgTypes) =>
  authPostToVisitor(makeAPIPath('/company/visitor'), arg);
