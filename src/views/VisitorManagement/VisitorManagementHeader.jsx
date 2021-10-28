import { makeStyles } from '@material-ui/core';
import React from 'react';
import styles from './VisitorManagementStyles';

const HEADER_NAME = '출입 관리';

const VisitorManagementHeader = ({ date, setDate }) => {
  const classes = makeStyles(styles)();

  const handleChange = ({ target: { value } }) => {
    setDate(value);
  };
  return (
    <>
      <h4 className={classes.cardTitleWhite}>{HEADER_NAME}</h4>
      <p className={classes.cardCategoryWhite}>
        <input type="date" value={date} className={classes.datePicker} onChange={handleChange} />
      </p>
    </>
  );
};

export default VisitorManagementHeader;
