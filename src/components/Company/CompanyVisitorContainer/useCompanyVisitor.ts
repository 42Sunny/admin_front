import { exitCompanyVisitor } from 'API/Visitor/exitCompanyVisitor';
import { getCompanyVisitor } from 'API/Visitor/getCompanyVisitor';
import IconButton from 'components/IconButton/IconButton';
import usePagination from 'hooks/usePagination';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/configureStore';
import { CompanyVisitorResponseType, setCompanyVisitorAction } from 'redux/modules/companyVisitor';
import { CompanyTableDataType } from '../CompanyContainer/CompanyContainer';

export type CompanyVisitorObjType = {
  checkinDate: string;
  checkinTime: string;
  checkoutTime: string | JSX.Element;
  visitorName: string;
  companyName: string;
  place: string;
};

type ArgTypes = {
  startDate: string;
  endDate: string;
};

const argForGetAllData = (startDate: string, endDate: string) => ({
  start: new Date(startDate),
  end: new Date(endDate),
  pagination: { size: 1000, page: 0 },
});

const useCompanyVisitor = ({ startDate, endDate }: ArgTypes) => {
  const companyVisitor = useSelector(({ companyVisitor }: RootState) => companyVisitor);
  const dispatch = useDispatch();
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

  const handleExitButtonClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (window.confirm('퇴실 처리하시겠습니까?')) {
        exitCompanyVisitor(event.currentTarget.id);
        const res = await getCompanyVisitor(argForGetAllData(startDate, endDate));
        dispatch(setCompanyVisitorAction(res.data));
      }
    },
    [dispatch, endDate, startDate],
  );

  const createExitButton = useCallback(
    (id: number) =>
      React.createElement(IconButton, {
        id: id.toString(),
        children: '퇴실',
        icon: 'logout',
        onClick: handleExitButtonClick,
      }),
    [handleExitButtonClick],
  );

  const dataToTableData = useCallback(
    (visitor: CompanyVisitorResponseType): CompanyVisitorObjType => ({
      place: visitor.place,
      checkinDate: moment(visitor.checkinTime).format('YYYY-MM-DD'),
      checkinTime: moment(visitor.checkinTime).format('HH:mm'),
      checkoutTime: visitor.checkoutTime
        ? moment(visitor.checkoutTime).format('HH:mm')
        : createExitButton(visitor.id),
      visitorName: visitor.visitorName,
      companyName: visitor.companyName,
    }),
    [createExitButton],
  );

  const ObjToArray = (visitor: CompanyVisitorObjType) => [
    visitor.place,
    visitor.checkinDate,
    visitor.companyName,
    visitor.visitorName,
    visitor.checkinTime,
    visitor.checkoutTime,
  ];

  useEffect(() => {
    const tableData = companyVisitor.map((elem) => ObjToArray(dataToTableData(elem)));
    setPage(1);
    setRawTableData(tableData);
    setPaginationLength(tableData.length);
  }, [companyVisitor, dataToTableData, setPage, setPaginationLength]);

  useEffect(() => {
    setTableData(rawTableData.slice(start - 1, end));
  }, [end, rawTableData, start]);

  const updateCompanyVisitor = useCallback(async () => {
    const res = await getCompanyVisitor(argForGetAllData(startDate, endDate));
    dispatch(setCompanyVisitorAction(res.data));
  }, [startDate, endDate, dispatch]);

  useEffect(() => {
    updateCompanyVisitor();
  }, [updateCompanyVisitor]);

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

export default useCompanyVisitor;
