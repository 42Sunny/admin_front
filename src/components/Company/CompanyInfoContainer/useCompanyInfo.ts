import { useFormattedPhone as formattedPhone } from 'hooks/useFormattedPhone';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/configureStore';
import { CompanyInfoType, setCompanyInfoAction } from 'redux/modules/companyInfo';
import { CompanyTableDataType } from '../CompanyContainer/CompanyContainer';
import IconButton from 'components/IconButton/IconButton';
import usePagination from 'hooks/usePagination';

const useCompanyInfo = () => {
  const companyInfo = useSelector(({ companyInfo }: RootState) => companyInfo);
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

  const updateCompanyVisitor = useCallback(() => {
    dispatch(setCompanyInfoAction());
  }, [dispatch]);
  useEffect(() => {
    const tableData = companyInfo.map((elem) => TableDataToArray(dataToTableData(elem)));
    setPage(1);
    setRawTableData(tableData);
    setPaginationLength(tableData.length);
  }, [companyInfo, setPage, setPaginationLength]);

  useEffect(() => {
    setTableData(rawTableData.slice(start - 1, end));
  }, [end, rawTableData, start]);

  return {
    tableData,
    updateCompanyVisitor,
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

type CompanyInfoDataType = {
  deleteButton: JSX.Element;
  enteranceButton: JSX.Element;
  name: string;
  phone: string;
};

const dataToTableData = (info: CompanyInfoType): CompanyInfoDataType => ({
  deleteButton: React.createElement(IconButton, {
    id: info.id.toString(),
    icon: 'delete',
    onClick: handleDeleteClick,
  }),
  enteranceButton: React.createElement(IconButton, {
    id: info.id.toString(),
    icon: 'login',
    onClick: handleEnteranceClick,
  }),
  name: info.name,
  phone: formattedPhone(info.phone),
});

const TableDataToArray = (info: CompanyInfoDataType) => [
  info.name,
  info.phone,
  info.enteranceButton,
  info.deleteButton,
];

const handleEnteranceClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  const name = window.prompt('방문자 이름을 입력해주세요.');
  if (name !== null && name !== '') {
    // TODO: API가 생성되는대로...
  }
};

const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  if (window.confirm('삭제 처리하시겠습니까?')) {
    // TODO: API가 생성되는대로...
  }
};

export default useCompanyInfo;
