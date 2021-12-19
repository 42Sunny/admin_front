import { postToVisitor } from 'API/APISetting/visitorAPI';
import { GetCompanyVisitorArgTypes, GetCompanyVisitorResponseType } from '.';

export const getCompanyVisitor = (arg: GetCompanyVisitorArgTypes) =>
  postToVisitor<GetCompanyVisitorArgTypes, GetCompanyVisitorResponseType>(
    '/company/visitor/date',
    arg,
  );
