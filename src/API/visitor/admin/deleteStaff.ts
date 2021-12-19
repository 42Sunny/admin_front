import { deleteToVisitor } from 'API/APISetting/visitorAPI';

export const deleteStaff = (staffId: string) => {
  const data = { staffId: Number.parseInt(staffId) };
  return deleteToVisitor('/admin/staff', { data });
};
