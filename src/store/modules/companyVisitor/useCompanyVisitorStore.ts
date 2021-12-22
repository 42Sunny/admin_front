import { GetCompanyVisitorResponseType } from 'API/visitor/company';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';
import {
  enterCompanyVisitorAction,
  exitCompanyVisitorAction,
  getCompanyVisitorAction,
  setCompanyVisitorAction,
} from './actions';

const useCompanyVisitorStore = () => {
  const dispatch = useDispatch();

  return {
    companyVisitor: useSelector<RootState, GetCompanyVisitorResponseType[]>(
      ({ companyVisitor }) => companyVisitor,
    ),
    setCompanyVisitor: useCallback(
      (arg: GetCompanyVisitorResponseType[]) => dispatch(setCompanyVisitorAction(arg)),
      [dispatch],
    ),
    getCompanyVisitor: useCallback(
      (start: string, end: string) => {
        dispatch(
          getCompanyVisitorAction.request({
            start: new Date(start),
            end: new Date(end),
            pagination: { size: 1000, page: 0 },
          }),
        );
      },
      [dispatch],
    ),
    exitCompanyVisitor: useCallback(
      (visitorId: string) => {
        dispatch(exitCompanyVisitorAction.request(visitorId));
      },
      [dispatch],
    ),
    enterCompanyVisitor: useCallback(
      (place: string, companyId: number, visitorName: string) => {
        dispatch(enterCompanyVisitorAction.request({ place, companyId, visitorName }));
      },
      [dispatch],
    ),
  };
};

export default useCompanyVisitorStore;
