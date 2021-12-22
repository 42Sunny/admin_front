import { patchToVisitor } from 'API/APISetting/visitorAPI';
import { ExitCompanyVisitorArgType, ExitCompanyVisitorResponseType } from '.';

export const exitCompanyVisitor = (visitorId: string) =>
  patchToVisitor<ExitCompanyVisitorArgType, ExitCompanyVisitorResponseType>(
    `/company/visitor/out/${visitorId}`,
  );
