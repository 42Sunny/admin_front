import { postToVisitor } from 'API/APISetting/visitorAPI';
import { EnterCompanyVisitorArgType, EnterCompanyVisitorResponseType } from '.';

export const enterCompanyVisitor = (args: EnterCompanyVisitorArgType) =>
  postToVisitor<EnterCompanyVisitorArgType, EnterCompanyVisitorResponseType>(
    '/company/visitor',
    args,
  );
