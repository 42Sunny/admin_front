import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@mui/material/Pagination';

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

export default function PaginationRounded({ lastPage, setPage }) {
  const classes = useStyles();

  const handleChange = (e, pageNum) => {
    setPage(pageNum);
  };

  return (
    <div className={classes.root}>
      <Pagination
        count={lastPage}
        defaultPage={1}
        siblingCount={4}
        boundaryCount={1}
        onChange={handleChange}
      />
    </div>
  );
}
