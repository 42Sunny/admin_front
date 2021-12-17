import { useFormattedPhone as formattedPhone } from 'hooks/useFormattedPhone';
import React, { useCallback, useEffect, useState } from 'react';
import { CompanyInfoResponseType } from 'store/modules/companyInfo/companyInfo';
import { CompanyTableDataType } from '../CompanyContainer/CompanyContainer';
import IconButton from 'components/IconButton/IconButton';
import usePagination from 'hooks/usePagination';
import { getCompany } from 'API/Visitor/getCompany';
import useCompanyInfoStore from 'store/modules/companyInfo/useCompanyInfoStore';

const useCompanyInfo = () => {
  const { companyInfo, setCompanyInfo } = useCompanyInfoStore();
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
    const tableData = companyInfo.map((elem) => TableDataToArray(dataToTableData(elem)));
    setPage(1);
    setRawTableData(tableData);
    setPaginationLength(tableData.length);
  }, [companyInfo, setPage, setPaginationLength]);

  useEffect(() => {
    setTableData(rawTableData.slice(start - 1, end));
  }, [end, rawTableData, start]);

  const updateCompanyInfo = useCallback(async () => {
    const res = await getCompany();
    setCompanyInfo(res.data);
  }, [setCompanyInfo]);

  useEffect(() => {
    updateCompanyInfo();
  }, [updateCompanyInfo]);

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

type CompanyInfoObjType = {
  deleteButton: JSX.Element;
  enteranceButton: JSX.Element;
  name: string;
  phone: string;
};

const dataToTableData = (info: CompanyInfoResponseType): CompanyInfoObjType => ({
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

const TableDataToArray = (info: CompanyInfoObjType) => [
  info.name,
  info.phone,
  info.enteranceButton,
  info.deleteButton,
];

const handleEnteranceClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  const name = window.prompt('방문자 이름을 입력해주세요.');
  const place = window.prompt('장소를 입력해주세요. (개포, 서초)');
  // TODO: modal로 변경 예정.
  if (name !== null && name !== '' && (place === '개포' || place === '서초')) {
    // TODO: API가 생성되는대로...
  }
};

const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  if (window.confirm('삭제 처리하시겠습니까?')) {
    // TODO: API가 생성되는대로...
  }
};

export default useCompanyInfo;
