import { makeStyles } from '@material-ui/core';
import React from 'react';
import VisitDataTableDatePicker from './VisitDataTableDatePicker';
import styles from './VisitorManagementStyles';

const HEADER_NAME = '출입 관리';

const VisitDataTableHeader = () => {
  const classes = makeStyles(styles)();

  return (
    <div className={classes.header}>
      <h4 className={classes.cardTitleWhite}>{HEADER_NAME}</h4>
      <VisitDataTableDatePicker />
    </div>
  );
};

export default VisitDataTableHeader;
