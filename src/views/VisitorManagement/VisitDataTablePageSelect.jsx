import { makeStyles } from '@material-ui/core';
import useVisitData from 'hooks/useVisitData';
import React from 'react';
import styles from './VisitorManagementStyles';

const VisitDataTablePageSelect = () => {
  const { page, setPage, lastPage } = useVisitData();
  const classes = makeStyles(styles)();

  const onIncrease = () => {
    if (page < lastPage) {
      const currentPage = page;
      setPage(currentPage + 1);
    }
  };

  const onDecrease = () => {
    if (page > 0) {
      const currentPage = page;
      setPage(currentPage - 1);
    }
  };

  return (
    <div className={classes.pageSelectBox}>
      <button className={classes.pageSelectButton} onClick={onDecrease}>
        {'<'}
      </button>
      <div className={classes.pageSelectContent}>{page + 1}</div>
      <button className={classes.pageSelectButton} onClick={onIncrease}>
        {'>'}
      </button>
    </div>
  );
};

export default VisitDataTablePageSelect;
