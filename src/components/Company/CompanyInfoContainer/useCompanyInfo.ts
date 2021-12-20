import { useFormattedPhone as formattedPhone } from 'hooks/useFormattedPhone';
import React, { useCallback, useEffect, useState } from 'react';
import { CompanyInfoResponseType } from 'store/modules/companyInfo/companyInfo';
import { CompanyTableDataType } from '../CompanyContainer/CompanyContainer';
import IconButton from 'components/IconButton/IconButton';
import usePagination from 'hooks/usePagination';
import useCompanyInfoStore from 'store/modules/companyInfo/useCompanyInfoStore';
import { createCompany, deleteCompany, getCompany } from 'API/visitor/company';
import LinkButton from './LinkButton';

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
    createCompany: useCallback(
      async (name: string, phone: string) => {
        await createCompany({
          name,
          phone,
        });
        await updateCompanyInfo();
      },
      [updateCompanyInfo],
    ),
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
  enteranceButton: React.createElement(LinkButton, {
    id: info.id.toString(),
    icon: 'login',
    path: `/company/management/enterance/${info.id}`,
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

const handleDeleteClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
  if (window.confirm('삭제 처리하시겠습니까?')) {
    await deleteCompany(event.currentTarget.id);
  }
};

export default useCompanyInfo;
