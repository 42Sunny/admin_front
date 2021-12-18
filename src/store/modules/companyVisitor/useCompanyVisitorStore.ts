import { GetCompanyVisitorResponseType } from 'API/Visitor/getCompanyVisitor';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';
import { setCompanyVisitorAction } from './companyVisitor';

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
  };
};

export default useCompanyVisitorStore;
