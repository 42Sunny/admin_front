import { postToVisitor } from 'API/APISetting/visitorAPI';

export const addStaff = (name: string, phone: string, department: string) => {
  const data = { name, phone, department };
  return postToVisitor('/admin/staff/save', data);
};
