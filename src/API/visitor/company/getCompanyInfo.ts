import { getToVisitor } from 'API/APISetting/visitorAPI';
import { GetCompanyInfoArgType, GetCompanyInfoResponseType } from '.';

export const getCompanyInfo = () =>
  getToVisitor<GetCompanyInfoArgType, GetCompanyInfoResponseType[]>('/company');
