import { postToVisitor } from 'API/APISetting/visitorAPI';

export const checkStaff = (staffName: string) => {
  const data = { staffName };
  return postToVisitor('/staff', data);
};
