import { makeStyles } from '@material-ui/core';
import { Icon } from '@mui/material';
import { SEARCH_OPTIONS } from './Define';
import styles from './VisitorManagementStyles';

const VisitorManagementSearchBar = ({
  searchOption,
  setSearchOption,
  searchValue,
  setSearchValue,
}) => {
  const classes = makeStyles(styles)();
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
              {elem.name}
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
        />
        <Icon className={classes.searchIcon}>search</Icon>
      </div>
    </div>
  );
};

export default VisitorManagementSearchBar;
