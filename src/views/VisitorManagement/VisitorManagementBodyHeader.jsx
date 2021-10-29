import { makeStyles } from '@material-ui/core';
import React from 'react';
import VisitorManagementSearchBar from './VisitorManagementSeachBar';
import styles from './VisitorManagementStyles';

const VisitorManagementBodyHeader = ({
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
    </div>
  );
};

export default VisitorManagementBodyHeader;
