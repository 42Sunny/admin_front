import { authDeleteToVisitor, makeAPIPath } from 'API/visitorApi';

export const deleteCompany = (companyId: string) =>
  authDeleteToVisitor(makeAPIPath(`/company/${companyId}`));
