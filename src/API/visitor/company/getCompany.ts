import { getToVisitor } from 'API/APISetting/visitorAPI';

export const getCompany = () => getToVisitor('/company', {});
