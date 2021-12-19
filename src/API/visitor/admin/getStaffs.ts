import { getToVisitor } from 'API/APISetting/visitorAPI';

export const getStaffs = () => {
  return getToVisitor('/admin/staff');
};
