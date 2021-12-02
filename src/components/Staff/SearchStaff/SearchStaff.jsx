import { Icon } from '@material-ui/core';
import React from 'react';
import { useStyles } from './SearchStaffStyles';

const SearchStaff = ({ searchValue, setSearchValue }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.body}>
        <input
          className={classes.input}
          placeholder="검색할 이름을 입력하세요"
          onChange={({ target: { value }, nativeEvent: { data } }) => {
            if (data !== '\\') setSearchValue(value);
          }}
          value={searchValue}
        />
        <Icon>search</Icon>
      </div>
    </div>
  );
};

export default SearchStaff;
