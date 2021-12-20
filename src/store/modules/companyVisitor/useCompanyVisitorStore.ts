import { GetCompanyVisitorResponseType } from 'API/visitor/company';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';
import {
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
    updateCompanyVisitor: useCallback(
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
  };
};

export default useCompanyVisitorStore;
