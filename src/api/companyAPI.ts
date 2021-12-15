import { visitorAPIInstance } from './APIHandler';

export const getCompanies = () => visitorAPIInstance.get('/v1/admin/staff');
