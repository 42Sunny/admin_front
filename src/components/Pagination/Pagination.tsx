import React from 'react';
import { useStyles } from './PaginationStyles';

type PropTypes = {
  paginationLength: number;
  start: number;
  end: number;
  decrease?: React.MouseEventHandler<HTMLButtonElement>;
  increase?: React.MouseEventHandler<HTMLButtonElement>;
  clickDescription?: React.MouseEventHandler<HTMLButtonElement>;
};

const Pagination = ({
  paginationLength,
  start,
  end,
  decrease,
  increase,
  clickDescription,
}: PropTypes) => {
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
