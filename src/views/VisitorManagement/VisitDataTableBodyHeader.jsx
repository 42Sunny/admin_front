import React from 'react';
import VisitDataTablePageSelect from './VisitDataTablePageSelect';
import VisitorManagementSearchBar from './VisitDataTableSeachBar';
import useStyles from './VisitorManagementStyles';

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
  const classes = useStyles();

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
