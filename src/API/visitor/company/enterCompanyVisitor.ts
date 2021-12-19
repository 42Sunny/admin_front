import { postToVisitor } from 'API/APISetting/visitorAPI';

type ArgTypes = {
  place: string;
  companyId: number;
  visitorName: string;
};
export const enterCompanyVisitor = (arg: ArgTypes) => postToVisitor('/company/visitor', arg);
