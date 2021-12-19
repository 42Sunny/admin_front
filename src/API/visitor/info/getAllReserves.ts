import { postToVisitor } from 'API/APISetting/visitorAPI';

export const getAllReserves = (date: Date) => {
  const data = { date };
  return postToVisitor('/info/reserve/date', data);
};
