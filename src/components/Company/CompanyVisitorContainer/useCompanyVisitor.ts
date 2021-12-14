import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/configureStore';
import { CompanyVisitorType, setCompanyVisitorAction } from 'redux/modules/companyVisitor';
import { CompanyTableDataType } from '../CompanyContainer/CompanyContainer';

const useCompanyVisitor = () => {
  const companyVisitor = useSelector(({ companyVisitor }: RootState) => companyVisitor);
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState<CompanyTableDataType[][]>([]);

  const updateCompanyVisitor = useCallback(() => {
    dispatch(setCompanyVisitorAction());
  }, [dispatch]);

  useEffect(() => {
    setTableData(companyVisitor.map(objToArray));
  }, [companyVisitor]);

  return { tableData, updateCompanyVisitor };
};

const objToArray = (visitor: CompanyVisitorType) => [
  moment(visitor.checkinTime).format('YYYY-MM-DD'),
  visitor.visitorName,
  visitor.companyName,
  moment(visitor.checkinTime).format('HH:mm'),
  visitor.checkoutTime
    ? moment(visitor.checkoutTime).format('HH:mm')
    : React.createElement('button', { id: visitor.id, children: '퇴실' }),
];

export default useCompanyVisitor;
