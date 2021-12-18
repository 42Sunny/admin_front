import { postToVisitor, makeAPIPath } from 'API/visitorApi';

type ArgTypes = {
  name: string;
  phone: string;
};
export const createCompany = (arg: ArgTypes) => postToVisitor(makeAPIPath('/company'), arg);
