import React, { useCallback, useEffect, useState } from 'react';
import { CompanyTableDataType } from '../CompanyContainer/CompanyContainer';
import IconButton from 'components/IconButton/IconButton';
import usePagination from 'hooks/usePagination';
import useCompanyInfoStore from 'store/modules/companyInfo/useCompanyInfoStore';
import LinkButton from './LinkButton';
import { GetCompanyInfoResponseType } from 'API/visitor/company';
import { deleteCompanyInfoAction } from 'store/modules/companyInfo/actions';
import { dispatchToStore } from 'utils/dispatchToStore';

const useCompanyInfo = () => {
  const { companyInfo, getCompanyInfo, createCompanyInfo } = useCompanyInfoStore();
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

  useEffect(() => {
    getCompanyInfo();
  }, [getCompanyInfo]);

  return {
    tableData,
    pagination: {
      start,
      end,
      paginationLength,
      increase,
      decrease,
      clickDescription: () => setPage(1),
    },
    createCompany: useCallback(
      async (name: string, phone: string) => {
        await createCompanyInfo({
          name,
          phone,
        });
        await getCompanyInfo();
      },
      [createCompanyInfo, getCompanyInfo],
    ),
  };
};

type CompanyInfoObjType = {
  deleteButton: JSX.Element;
  enteranceButton: JSX.Element;
  name: string;
  phone: string;
};

const dataToTableData = (info: GetCompanyInfoResponseType): CompanyInfoObjType => ({
  deleteButton: React.createElement(IconButton, {
    id: info.id.toString(),
    icon: 'delete',
    onClick: handleDeleteClick,
  }),
  enteranceButton: React.createElement(LinkButton, {
    id: info.id.toString(),
    icon: 'login',
    path: `/company/management/enterance/${info.id}`,
  }),
  name: info.name,
  phone: info.phone,
});

const TableDataToArray = (info: CompanyInfoObjType) => [
  info.name,
  info.phone,
  info.enteranceButton,
  info.deleteButton,
];

const handleDeleteClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
  if (window.confirm('삭제 처리하시겠습니까?')) {
    dispatchToStore(deleteCompanyInfoAction.request(event.currentTarget.id));
  }
};

export default useCompanyInfo;
