import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@mui/material/Pagination';
import useCriteria from 'store/modules/criteria/useCriteriaStore';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      padding: '1rem, 0',
    },
  },
}));

export default function PaginationRounded() {
  const classes = useStyles();
  const {
    criteria: { lastPage, currentPage },
    setCurrentPage,
  } = useCriteria();

  const handleChange = (e, pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className={classes.root}>
      <Pagination
        count={lastPage}
        defaultPage={1}
        siblingCount={4}
        boundaryCount={1}
        page={currentPage}
        onChange={handleChange}
      />
    </div>
  );
}
