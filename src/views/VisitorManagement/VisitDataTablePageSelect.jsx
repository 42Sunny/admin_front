import useVisitData from 'hooks/useVisitData';
import React, { useContext } from 'react';
import Pagination from 'components/Pagination/Pagination';
import { VisitorManagementContext } from 'contexts/VisitorManagementContext';

const VisitDataTablePageSelect = () => {
  const { page, setPage, lastPage } = useVisitData();

  const {
    allCount: { all },
  } = useContext(VisitorManagementContext);

  const paginationProps = {
    paginationLength: all,
    start: all >= page * 10 + 1 ? page * 10 + 1 : 0,
    end: all >= (page + 1) * 10 ? (page + 1) * 10 : all,
    decrease: () => {
      if (page > 0) {
        setPage((page) => page - 1);
      }
    },
    increase: () => {
      if (page + 1 < lastPage) {
        setPage((page) => page + 1);
      }
    },
    clickDescription: () => {
      setPage(0);
    },
  };

  return <Pagination {...paginationProps} />;
};

export default VisitDataTablePageSelect;
