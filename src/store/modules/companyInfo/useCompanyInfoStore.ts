import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';
import { CompanyInfoResponseType, setCompanyInfoAction } from './companyInfo';

const useCompanyInfoStore = () => {
  const dispatch = useDispatch();

  return {
    companyInfo: useSelector<RootState, CompanyInfoResponseType[]>(
      ({ companyInfo }) => companyInfo,
    ),
    setCompanyInfo: useCallback(
      (payload) => dispatch(setCompanyInfoAction(payload)),
      [dispatch],
    ),
  };
};

export default useCompanyInfoStore;
