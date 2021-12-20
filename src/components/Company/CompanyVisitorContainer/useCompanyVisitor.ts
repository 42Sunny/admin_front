import { GetCompanyVisitorResponseType } from 'API/visitor/company';
import IconButton from 'components/IconButton/IconButton';
import usePagination from 'hooks/usePagination';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import useCompanyVisitorStore from 'store/modules/companyVisitor/useCompanyVisitorStore';
import { CompanyTableDataType } from '../CompanyContainer/CompanyContainer';
import store from 'store/configureStore';
import {
  exitCompanyVisitorAction,
  getCompanyVisitorAction,
} from 'store/modules/companyVisitor/actions';

export type CompanyVisitorObjType = {
  checkoutTime: string | JSX.Element;
  checkinDate: string;
  checkinTime: string;
  companyName: string;
  place: string;
  name: string;
};

type ArgTypes = {
  startDate: string;
  endDate: string;
};

type DateType = {
  start: Date;
  end: Date;
};

const useCompanyVisitor = ({ startDate, endDate }: ArgTypes) => {
  const { companyVisitor, updateCompanyVisitor } = useCompanyVisitorStore();
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
    const tableData = companyVisitor.map((elem) =>
      ObjToArray(dataToTableData(elem, { start: new Date(startDate), end: new Date(endDate) })),
    );
    setPage(1);
    setRawTableData(tableData);
    setPaginationLength(tableData.length);
  }, [companyVisitor, endDate, setPage, setPaginationLength, startDate]);

  useEffect(() => {
    setTableData(rawTableData.slice(start - 1, end));
  }, [end, rawTableData, start]);

  useEffect(() => {}, [endDate, startDate, updateCompanyVisitor]);

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

const handleExitButtonClick = async (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  date: DateType,
) => {
  if (window.confirm('퇴실 처리하시겠습니까?')) {
    store.dispatch(exitCompanyVisitorAction.request(event.currentTarget.id));
    store.dispatch(
      getCompanyVisitorAction.request({
        ...date,
        pagination: {
          page: 0,
          size: 1000,
        },
      }),
    );
  }
};

const createExitButton = (id: number, date: DateType) =>
  React.createElement(IconButton, {
    id: id.toString(),
    children: '퇴실',
    icon: 'logout',
    onClick: (event) => handleExitButtonClick(event, date),
  });

const dataToTableData = (
  visitor: GetCompanyVisitorResponseType,
  date: DateType,
): CompanyVisitorObjType => ({
  place: visitor.place,
  checkinDate: moment(visitor.checkIn).format('YYYY-MM-DD'),
  checkinTime: moment(visitor.checkIn).format('HH:mm'),
  checkoutTime: visitor.checkOut
    ? moment(visitor.checkOut).format('HH:mm')
    : createExitButton(visitor.id, date),
  name: visitor.name,
  companyName: visitor.companyName,
});

const ObjToArray = (visitor: CompanyVisitorObjType) => [
  visitor.place,
  visitor.checkinDate,
  visitor.companyName,
  visitor.name,
  visitor.checkinTime,
  visitor.checkoutTime,
];

export default useCompanyVisitor;
