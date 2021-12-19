import { postToVisitor } from 'API/APISetting/visitorAPI';

type ArgTypes = {
  name: string;
  phone: string;
};
export const createCompany = (arg: ArgTypes) => postToVisitor('/company', arg);
