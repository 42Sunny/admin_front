import {
  CreateCompanyInfoArgType,
  DeleteCompanyInfoArgType,
  GetCompanyInfoResponseType,
} from 'API/visitor/company';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';
import {
  createCompanyInfoAction,
  deleteCompanyInfoAction,
  getCompanyInfoAction,
  setCompanyInfoAction,
} from './actions';

const useCompanyInfoStore = () => {
  const dispatch = useDispatch();

  return {
    companyInfo: useSelector<RootState, GetCompanyInfoResponseType[]>(
      ({ companyInfo }) => companyInfo,
    ),
    setCompanyInfo: useCallback(
      (companyInfo: GetCompanyInfoResponseType[]) => dispatch(setCompanyInfoAction(companyInfo)),
      [dispatch],
    ),
    getCompanyInfo: useCallback(() => dispatch(getCompanyInfoAction.request()), [dispatch]),
    deleteCompanyInfo: useCallback(
      (arg: DeleteCompanyInfoArgType) => dispatch(deleteCompanyInfoAction.request(arg)),
      [dispatch],
    ),
    createCompanyInfo: useCallback(
      (arg: CreateCompanyInfoArgType) => dispatch(createCompanyInfoAction.request(arg)),
      [dispatch],
    ),
  };
};

export default useCompanyInfoStore;
