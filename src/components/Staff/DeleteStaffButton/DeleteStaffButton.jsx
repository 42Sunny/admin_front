import { Icon } from '@material-ui/core';
import { deleteStaff } from 'API/visitor/admin';
import React from 'react';
import { useStyles } from './DeleteStaffButtonStyles';

const CONFIRM_DELETE_MESSAGE = (name, phone) =>
  `이름 : ${name}\n번호 : ${phone}\n해당 내용을 직원을 삭제하시겠습니까?`;

const DeleteStaffButton = ({ id, name, phone, reloadData }) => {
  const classes = useStyles();

  const handleClick = async () => {
    if (window.confirm(CONFIRM_DELETE_MESSAGE(name, phone)) === true) {
      await deleteStaff(id);
      reloadData();
    }
  };

  return (
    <div className={classes.container}>
      <button onClick={handleClick} className={classes.button}>
        <Icon>delete</Icon>
      </button>
    </div>
  );
};

export default DeleteStaffButton;
