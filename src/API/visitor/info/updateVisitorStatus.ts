import { putToVisitor } from 'API/APISetting/visitorAPI';

export const updateVisitorStatus = (id: string, status: string) => {
  const data = { visitor: { id, status } };
  return putToVisitor('/info/visitor/status', data);
};
