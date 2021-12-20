import { postToVisitor } from 'API/APISetting/visitorAPI';
import { CreateCompanyInfoArgType, CreateCompanyInfoResponseType } from '.';

export const createCompanyInfo = (arg: CreateCompanyInfoArgType) =>
  postToVisitor<CreateCompanyInfoArgType, CreateCompanyInfoResponseType>('/company', arg);
