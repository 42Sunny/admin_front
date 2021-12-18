import { getToVisitor, makeAPIPath } from 'API/visitorApi';

export const getCompany = () => getToVisitor(makeAPIPath('/company'), {});
