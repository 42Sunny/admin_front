import { deleteToVisitor, makeAPIPath } from 'API/visitorApi';

export const deleteCompany = (companyId: string) =>
  deleteToVisitor(makeAPIPath(`/company/${companyId}`));
