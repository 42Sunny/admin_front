import useStyles from './VisitorManagementStyles';
import React from 'react';
import VisitDataTableDatePicker from './VisitDataTableDatePicker';

const HEADER_NAME = '출입 관리';

const VisitDataTableHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <h4 className={classes.cardTitleWhite}>{HEADER_NAME}</h4>
      <VisitDataTableDatePicker />
    </div>
  );
};

export default VisitDataTableHeader;
