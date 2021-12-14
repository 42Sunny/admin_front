import { visitorAPIWrapper } from './APIWrapper';

export const getCompanies = () => visitorAPIWrapper<any>('get', '/v1/company', {});
