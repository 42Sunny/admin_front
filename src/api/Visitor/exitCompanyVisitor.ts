import { patchToVisitor, makeAPIPath } from 'API/visitorApi';

export const exitCompanyVisitor = (visitorId: string) =>
  patchToVisitor(makeAPIPath(`/company/visitor/out/${visitorId}`));
