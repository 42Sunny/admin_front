import { deleteToVisitor } from 'API/APISetting/visitorAPI';

export const deleteCompany = (companyId: string) => deleteToVisitor(`/company/${companyId}`);
