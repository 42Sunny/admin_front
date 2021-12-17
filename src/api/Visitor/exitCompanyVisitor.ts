import { authPatchToVisitor, makeAPIPath } from 'API/visitorApi';

export const exitCompanyVisitor = (visitorId: string) =>
  authPatchToVisitor(makeAPIPath(`/company/visitor/out/${visitorId}`));
