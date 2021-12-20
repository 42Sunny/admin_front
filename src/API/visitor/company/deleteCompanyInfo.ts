import { deleteToVisitor } from 'API/APISetting/visitorAPI';
import { DeleteCompanyInfoArgType, DeleteCompanyInfoResponseType } from '.';

export const deleteCompanyInfo = (companyId: string) =>
  deleteToVisitor<DeleteCompanyInfoArgType, DeleteCompanyInfoResponseType>(`/company/${companyId}`);
