import { postToVisitor, makeAPIPath } from 'API/visitorApi';

type ArgTypes = {
  place: string;
  companyId: number;
  visitorName: string;
};
export const enterCompanyVisitor = (arg: ArgTypes) =>
  postToVisitor(makeAPIPath('/company/visitor'), arg);
