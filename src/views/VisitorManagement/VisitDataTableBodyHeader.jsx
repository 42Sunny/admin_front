import { makeStyles } from '@material-ui/core';
import React from 'react';
import VisitDataTablePageSelect from './VisitDataTablePageSelect';
import VisitorManagementSearchBar from './VisitDataTableSeachBar';
import styles from './VisitorManagementStyles';

const VisitDataTableBodyHeader = ({
  setCheckGaepo,
  setCheckSeocho,
  checkGaepo,
  checkSeocho,
  searchOption,
  setSearchOption,
  searchValue,
  setSearchValue,
}) => {
  const classes = makeStyles(styles)();
  return (
    <div className={classes.bodyHeader}>
      <VisitorManagementSearchBar
        searchOption={searchOption}
        setSearchOption={setSearchOption}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <VisitDataTablePageSelect />
    </div>
  );
};

export default VisitDataTableBodyHeader;
