import React from 'react';
import { useStyles } from './PaginationStyles';

const Pagination = ({ paginationLength, start, end, decrease, increase, clickDescription }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <button
        className={classes.description}
        onClick={clickDescription}
      >{`${paginationLength}개 중 ${start}~${end}`}</button>
      <div className={classes.controller}>
        <button onClick={decrease}>{'<'}</button>
        <button onClick={increase}>{'>'}</button>
      </div>
    </div>
  );
};

export default Pagination;
