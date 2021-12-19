import { patchToVisitor } from 'API/APISetting/visitorAPI';

export const exitCompanyVisitor = (visitorId: string) =>
  patchToVisitor(`/company/visitor/out/${visitorId}`);
