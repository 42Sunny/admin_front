import { postToVisitor } from 'API/APISetting/visitorAPI';
import { GetCompanyVisitorArgType, GetCompanyVisitorResponseType } from '.';

export const getCompanyVisitor = (arg: GetCompanyVisitorArgType) =>
  postToVisitor<GetCompanyVisitorArgType, GetCompanyVisitorResponseType[]>(
    '/company/visitor/date',
    arg,
  );
