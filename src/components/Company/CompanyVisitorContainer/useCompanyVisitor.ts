import { exitCompanyVisitor, GetCompanyVisitorResponseType } from 'API/visitor/company';
import IconButton from 'components/IconButton/IconButton';
import usePagination from 'hooks/usePagination';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import useCompanyVisitorStore from 'store/modules/companyVisitor/useCompanyVisitorStore';
import { CompanyTableDataType } from '../CompanyContainer/CompanyContainer';

export type CompanyVisitorObjType = {
  checkinDate: string;
  checkinTime: string;
  checkoutTime: string | JSX.Element;
  name: string;
  companyName: string;
  place: string;
};

type ArgTypes = {
  startDate: string;
  endDate: string;
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
    const tableData = companyVisitor.map((elem) => ObjToArray(dataToTableData(elem)));
    setPage(1);
    setRawTableData(tableData);
    setPaginationLength(tableData.length);
  }, [companyVisitor, setPage, setPaginationLength]);

  useEffect(() => {
    setTableData(rawTableData.slice(start - 1, end));
  }, [end, rawTableData, start]);

  useEffect(() => {
    updateCompanyVisitor(startDate, endDate);
  }, [endDate, startDate, updateCompanyVisitor]);

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

const handleExitButtonClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  if (window.confirm('퇴실 처리하시겠습니까?')) {
    await exitCompanyVisitor(event.currentTarget.id);
    // TODO: 업데이트 처리
  }
};

const createExitButton = (id: number) =>
  React.createElement(IconButton, {
    id: id.toString(),
    children: '퇴실',
    icon: 'logout',
    onClick: handleExitButtonClick,
  });

const dataToTableData = (visitor: GetCompanyVisitorResponseType): CompanyVisitorObjType => ({
  place: visitor.place,
  checkinDate: moment(visitor.checkIn).format('YYYY-MM-DD'),
  checkinTime: moment(visitor.checkIn).format('HH:mm'),
  checkoutTime: visitor.checkOut
    ? moment(visitor.checkOut).format('HH:mm')
    : createExitButton(visitor.id),
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
