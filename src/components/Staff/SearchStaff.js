import { Icon } from '@material-ui/core';
import React from 'react';
import { useStyles } from './Styles';

const SearchStaff = ({ searchValue, setSearchValue }) => {
  const classes = useStyles();

  return (
    <div className={classes.searchBox}>
      <div>
        <div>
          {/* <select className={classes.searchSelect}>
            <option>이름</option>
            <option>휴대폰 번호</option>
          </select> */}
        </div>
        <div className={classes.searchInputBox}>
          <input
            className={classes.searchInput}
            placeholder="검색할 이름을 입력하세요"
            onChange={({ target: { value } }) => {
              setSearchValue(value);
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
