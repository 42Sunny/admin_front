import { Icon } from '@material-ui/core';
import React from 'react';
import { useStyles } from './Styles';

const SearchStaff = ({ searchValue, setSearchValue }) => {
  const classes = useStyles();

  return (
    <div className={classes.searchBox}>
      <div>
        <div className={classes.searchInputBox}>
          <input
            className={classes.searchInput}
            placeholder="검색할 이름을 입력하세요"
            onChange={({ target: { value }, nativeEvent: { data } }) => {
              if (data !== '\\') setSearchValue(value);
            }}
            value={searchValue}
          />
          <Icon className={classes.searchIcon}>search</Icon>
        </div>
      </div>
    </div>
  );
};

export default SearchStaff;
