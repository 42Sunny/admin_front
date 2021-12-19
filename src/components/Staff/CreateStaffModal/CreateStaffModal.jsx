/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Icon, Modal } from '@material-ui/core';
import { addStaff } from 'API/visitor/admin';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import RegularButton from 'components/CustomButtons/Button';
import React, { useEffect, useState } from 'react';
import { useStyles } from './CreateStaffModalStyles';
import {
  checkContents,
  CREATE_CONFIRM_MESSAGE,
  CREATE_STAFF_MODAL_ADD_BUTTON_TEXT as CREATE_STAFF_MODAL_SUBMIT_BUTTON_TEXT,
  CREATE_STAFF_MODAL_SUBTITLE,
  CREATE_STAFF_MODAL_TITLE,
  getOnlyNumber,
  INPUT_DEPARTMENT_NAME,
  INPUT_NAME_NAME,
  INPUT_PHONE_NAME,
} from './CreateStaffModalUtils';

const CreateStaffModal = ({ open, onClose, reloadData }) => {
  const classes = useStyles();
  const [department, setDepartment] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const {
      target: { value, name },
      nativeEvent: { data },
    } = event;
    if (name === INPUT_NAME_NAME) setName(value);
    else if (name === INPUT_PHONE_NAME && (isNaN(data) === false || data === '-')) setPhone(value);
    else if (name === INPUT_DEPARTMENT_NAME) setDepartment(value);
  };

  const submitData = async () => {
    setErrorMessage('');
    const checkContentsResult = await checkContents(name, phone);
    if (checkContentsResult === true) {
      if (window.confirm(CREATE_CONFIRM_MESSAGE(department, name, phone)) === true) {
        await addStaff(name, getOnlyNumber(phone), department);
        setName('');
        setPhone('');
        setDepartment('');
        reloadData();
      }
    } else {
      setErrorMessage(checkContentsResult);
    }
  };

  const exitModal = () => onClose();

  useEffect(() => {
    setName('');
    setPhone('');
    setDepartment('');
    setErrorMessage('');
  }, [open]);

  const inputsProps = [
    {
      name: INPUT_DEPARTMENT_NAME,
      value: department,
      onChange: handleChange,
      placeholder: '소속',
      className: classes.input,
    },
    {
      name: INPUT_NAME_NAME,
      value: name,
      onChange: handleChange,
      placeholder: '이름',
      className: classes.input,
    },
    {
      name: INPUT_PHONE_NAME,
      value: phone,
      onChange: handleChange,
      placeholder: '휴대폰 번호',
      type: 'tel',
      className: classes.input,
    },
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.container}>
        <Card>
          <CardHeader color="info" className={classes.header}>
            <div>
              <h4 className={classes.title}>{CREATE_STAFF_MODAL_TITLE}</h4>
              <p className={classes.subTitle}>{CREATE_STAFF_MODAL_SUBTITLE}</p>
            </div>
            <button onClick={exitModal} className={classes.exitButton}>
              <Icon>close</Icon>
            </button>
          </CardHeader>
          <CardBody>
            <div className={classes.inputContainer}>
              {inputsProps.map((props) => (
                <input {...props} key={props.name} />
              ))}
              <RegularButton color="info" onClick={submitData} className={classes.submitButton}>
                {CREATE_STAFF_MODAL_SUBMIT_BUTTON_TEXT}
              </RegularButton>
            </div>
            <div className={classes.error}>{errorMessage}</div>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};

export default CreateStaffModal;
