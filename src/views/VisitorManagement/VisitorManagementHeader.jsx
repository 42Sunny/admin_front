import { makeStyles } from '@material-ui/core';
import React, { useRef } from 'react';
import styles from './VisitorManagementStyles';

const HEADER_NAME = '출입 관리';

const VisitorManagementHeader = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const classes = makeStyles(styles)();
  const startDatePicker = useRef();

  const handleStartDateChange = ({ target: { value } }) => {
    if (value !== '') {
      if (value >= endDate) setEndDate(value);
      setStartDate(value);
    }
  };

  const handleEndDateChange = ({ target: { value } }) => {
    if (value !== '') {
      if (value <= startDate) setStartDate(value);
      setEndDate(value);
    }
  };

  return (
    <div className={classes.header}>
      <h4 className={classes.cardTitleWhite}>{HEADER_NAME}</h4>
      <div className={classes.datePickerBox}>
        <input
          id="startDate"
          type="date"
          value={startDate}
          className={classes.datePicker}
          onChange={handleStartDateChange}
          ref={startDatePicker}
        />
        <div>~</div>
        <input
          type="date"
          value={endDate}
          className={classes.datePicker}
          onChange={handleEndDateChange}
        />
      </div>
    </div>
  );
};

export default VisitorManagementHeader;
