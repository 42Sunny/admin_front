import { Icon } from '@material-ui/core';
import { deleteStaff } from 'api/visitorApi';
import React from 'react';
import { useStyles } from './Styles';

const CONFIRM_DELETE_MESSAGE = (name, phone) =>
  `이름 : ${name}\n번호 : ${phone}\n해당 내용을 직원을 삭제하시겠습니까?`;

const DeleteStaffButton = ({ id, name, phone, setChangeValue }) => {
  const classes = useStyles();

  return (
    <div className={classes.deleteButtonBox}>
      <button
        onClick={() => {
          if (window.confirm(CONFIRM_DELETE_MESSAGE(name, phone)) === true) {
            deleteStaff(id).then(() => {
              setChangeValue(true);
            });
          }
        }}
        className={classes.deleteButton}
      >
        <Icon>remove_circle</Icon>
      </button>
    </div>
  );
};

export default DeleteStaffButton;
