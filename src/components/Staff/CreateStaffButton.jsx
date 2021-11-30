import { Icon } from '@material-ui/core';
import React from 'react';
import { useStyles } from './Styles';

const CreateStaffButton = ({ onClick }) => {
  const classes = useStyles();
  return (
    <button onClick={onClick} className={classes.addButton}>
      <div className={classes.addText}>직원 추가</div>
      <Icon className={classes.addIcon}>add_circle</Icon>
    </button>
  );
};

export default CreateStaffButton;
