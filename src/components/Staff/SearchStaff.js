import { Icon } from '@material-ui/core';
import React from 'react';
import { useStyles } from './Styles';

const SearchStaff = ({ searchValue, setSearchValue }) => {
  const classes = useStyles();

  return (
    <div className={classes.searchBox}>
      <Icon className={classes.searchIcon}>search</Icon>
      <input
        className={classes.searchInput}
        placeholder="이름을 입력하세요"
        onChange={({ target: { value } }) => {
          setSearchValue(value);
        }}
        value={searchValue}
      />
    </div>
  );
};

export default SearchStaff;
