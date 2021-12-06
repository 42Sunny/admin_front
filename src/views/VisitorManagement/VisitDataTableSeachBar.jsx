import { Icon } from '@mui/material';
import { VisitorManagementContext } from 'contexts/VisitorManagementContext';
import { SEARCH_OPTIONS } from './Define';
import useStyles from './VisitorManagementStyles';
import { useContext } from 'react';

const VisitDataTableSeachBar = ({ searchOption, setSearchOption, searchValue, setSearchValue }) => {
  const classes = useStyles();
  const { reloadData } = useContext(VisitorManagementContext);

  return (
    <div className={classes.searchContainer}>
      <div className={classes.searchBox}>
        <select
          className={classes.searchSelect}
          value={searchOption}
          onChange={({ target: { value } }) => setSearchOption(value)}
        >
          {SEARCH_OPTIONS.map((elem, idx) => (
            <option key={idx} value={elem.value}>
              {elem.text}
            </option>
          ))}
        </select>
        <input
          className={classes.searchInput}
          placeholder="다음으로 검색"
          value={searchValue}
          onChange={({ target: { value }, nativeEvent: { data } }) => {
            if (data !== '\\') setSearchValue(value);
          }}
          onKeyDown={reloadData}
        />
        <Icon className={classes.searchIcon} onClick={reloadData}>
          search
        </Icon>
      </div>
    </div>
  );
};

export default VisitDataTableSeachBar;
