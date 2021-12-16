import IconButton from 'components/IconButton/IconButton';
import usePagination from 'hooks/usePagination';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/configureStore';
import { CompanyVisitorType } from 'redux/modules/companyVisitor';
import { CompanyTableDataType } from '../CompanyContainer/CompanyContainer';

export type CompanyVisitorDataType = {
  checkinDate: string;
  checkinTime: string;
  checkoutTime: string | JSX.Element;
  visitorName: string;
  companyName: string;
};

type UseCompanyVisitorArgTypes = {
  startDate: string;
  endDate: string;
};

const useCompanyVisitor = ({ startDate, endDate }: UseCompanyVisitorArgTypes) => {
  const companyVisitor = useSelector(({ companyVisitor }: RootState) => companyVisitor);
  const [rawTableData, setRawTableData] = useState<CompanyTableDataType[][]>([]);
  const [tableData, setTableData] = useState<CompanyTableDataType[][]>([]);
  const {
    current: { start, end },
    paginationLength,
    setPaginationLength,
    increase,
    decrease,
    setPage,
  } = usePagination();

  useEffect(() => {
    const tableData = companyVisitor.map((elem) => TableDataToArray(dataToTableData(elem)));
    setPage(1);
    setRawTableData(tableData);
    setPaginationLength(tableData.length);
  }, [companyVisitor, setPage, setPaginationLength]);

  useEffect(() => {
    setTableData(rawTableData.slice(start - 1, end));
  }, [end, rawTableData, start]);

  return {
    tableData,
    pagination: {
      start,
      end,
      paginationLength,
      increase,
      decrease,
      clickDescription: () => setPage(0),
    },
  };
};

const dataToTableData = (visitor: CompanyVisitorType): CompanyVisitorDataType => ({
  checkinDate: moment(visitor.checkinTime).format('YYYY-MM-DD'),
  checkinTime: moment(visitor.checkinTime).format('HH:mm'),
  checkoutTime: visitor.checkoutTime
    ? moment(visitor.checkoutTime).format('HH:mm')
    : React.createElement(IconButton, {
        id: visitor.id.toString(),
        children: '퇴실',
        icon: 'logout',
        onClick: handleDeleteButtonClick,
      }),
  visitorName: visitor.visitorName,
  companyName: visitor.companyName,
});

const TableDataToArray = (visitor: CompanyVisitorDataType) => [
  visitor.checkinDate,
  visitor.companyName,
  visitor.visitorName,
  visitor.checkinTime,
  visitor.checkoutTime,
];

const handleDeleteButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  if (window.confirm('퇴실 처리하시겠습니까?')) {
    // const id = event.currentTarget.id;
  }
};

export default useCompanyVisitor;
