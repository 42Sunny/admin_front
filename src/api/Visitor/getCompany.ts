import { authGetToVisitor, makeAPIPath } from 'API/visitorApi';

export const getCompany = () => authGetToVisitor(makeAPIPath('/company'), {});
