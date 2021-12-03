import React from 'react';
import { useStyles } from './StaffPaginationStyles';

const StaffPagination = ({ paginationLength, current, increase, decrease, setPage }) => {
  const classes = useStyles();

  const handleClick = () => setPage(1);

  return (
    <div className={classes.container}>
      <button
        className={classes.description}
        onClick={handleClick}
      >{`${paginationLength}개 중 ${current.start}~${current.end}`}</button>
      <div className={classes.controller}>
        <button onClick={decrease}>{'<'}</button>
        <button onClick={increase}>{'>'}</button>
      </div>
    </div>
  );
};

export default StaffPagination;
