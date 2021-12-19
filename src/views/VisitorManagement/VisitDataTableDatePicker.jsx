import React from 'react';
import useStyles from './VisitorManagementStyles';
import useVisitData from 'hooks/useVisitData';

const VisitDataTableDatePicker = () => {
  const classes = useStyles();
  const { startDate, endDate, setStartDate, setEndDate } = useVisitData();

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
    <div className={classes.datePickerBox}>
      <input
        type="date"
        value={startDate}
        className={classes.datePicker}
        onChange={handleStartDateChange}
      />
      <div>~</div>
      <input
        type="date"
        value={endDate}
        className={classes.datePicker}
        onChange={handleEndDateChange}
      />
    </div>
  );
};

export default VisitDataTableDatePicker;
