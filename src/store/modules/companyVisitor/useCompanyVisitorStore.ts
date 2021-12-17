import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';
import {
  CompanyVisitorResponseType,
  setCompanyVisitorAction,
} from './companyVisitor';

const useCompanyVisitorStore = () => {
  const dispatch = useDispatch();

  return {
    companyVisitor: useSelector<RootState, CompanyVisitorResponseType[]>(
      ({ companyVisitor }) => companyVisitor,
    ),
    setCompanyVisitor: useCallback(
      (payload) => dispatch(setCompanyVisitorAction(payload)),
      [dispatch],
    ),
  };
};

export default useCompanyVisitorStore;
