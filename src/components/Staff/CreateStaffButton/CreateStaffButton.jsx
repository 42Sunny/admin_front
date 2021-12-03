import { Icon } from '@material-ui/core';
import React from 'react';
import { useStyles } from './CreateStaffButtonStyles';

const CreateStaffButton = ({ onClick }) => {
  const classes = useStyles();
  return (
    <button onClick={onClick} className={classes.button}>
      <div className={classes.text}>직원 추가</div>
      <Icon className={classes.icon}>add_circle</Icon>
    </button>
  );
};

export default CreateStaffButton;
