import Pagination from 'components/Pagination';
import React, { useCallback } from 'react';

const StaffPagination = ({ paginationLength, current, increase, decrease, setPage }) => {
  const paginationProps = {
    paginationLength,
    start: current.start,
    end: current.end,
    increase,
    decrease,
    setPage,
    clickDescription: useCallback(() => setPage(1), [setPage]),
  };

  return <Pagination {...paginationProps} />;
};

export default StaffPagination;
