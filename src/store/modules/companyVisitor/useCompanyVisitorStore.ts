import { GetCompanyVisitorResponseType } from 'API/visitor/company';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';
import { getCompanyVisitorAction, setCompanyVisitorAction } from './actions';

const useCompanyVisitorStore = () => {
  const dispatch = useDispatch();

  return {
    companyVisitor: useSelector<RootState, GetCompanyVisitorResponseType[]>(
      ({ companyVisitor }) => companyVisitor,
    ),
    setCompanyVisitor: useCallback(
      (payload) => dispatch(setCompanyVisitorAction(payload)),
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
  };
};

export default useCompanyVisitorStore;
