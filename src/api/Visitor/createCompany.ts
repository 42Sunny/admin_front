import { authPostToVisitor, makeAPIPath } from 'API/visitorApi';

type ArgTypes = {
  name: string;
  phone: string;
};
export const createCompany = (arg: ArgTypes) => authPostToVisitor(makeAPIPath('/company'), arg);
