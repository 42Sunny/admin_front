import { Modal } from '@material-ui/core';
import { checkStaff } from 'api/visitorApi';
import { addStaff } from 'api/visitorApi';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import RegularButton from 'components/CustomButtons/Button';
import React, { useEffect, useState } from 'react';
import { useStyles } from './CreateStaffModalStyles';

const DUPLICATE_NAME_ERROR_MESSAGE = '이미 사용중인 이름입니다.';
const INVALIDE_PHONE_ERROR_MESSAGE = '번호 형식이 올바르지 않습니다.';
const INVALIDE_NAME_ERROR_MESSAGE = '공백으로 지정할 수 없습니다.';
const INPUT_DEPARTMENT_NAME = 'department';
const INPUT_NAME_NAME = 'name';
const INPUT_PHONE_NAME = 'phone';
const PHONE_REG_EXP = /^01\d{8,9}$/; // 휴대폰 번호 유효성 검사 정규표현식

const CREATE_CONFIRM_MESSAGE = (department, name, phone) =>
  `소속 : ${department}\n이름 : ${name}\n번호 : ${phone}\n해당 내용을 직원을 추가하시겠습니까?`;

const getOnlyNumber = (num) => {
  const phoneArray = Array.from(num);
  const filteredArray = phoneArray.filter((elem) => isNaN(elem) === false && elem !== ' ');
  const filtered = filteredArray.join('');
  return filtered;
};

const checkPhone = (phone) => {
  const phoneArray = Array.from(phone);
  const filteredArray = phoneArray.filter((elem) => isNaN(elem) === false && elem !== ' ');
  const filtered = filteredArray.join('');
  if (PHONE_REG_EXP.exec(filtered) !== null) return true;
  return INVALIDE_PHONE_ERROR_MESSAGE;
};

const checkName = async (name) => {
  if (name === '') return INVALIDE_NAME_ERROR_MESSAGE;
  const { data } = await checkStaff(name);
  if (data.code === '2000') return DUPLICATE_NAME_ERROR_MESSAGE;
  return true;
};

const checkContents = async (name, phone) => {
  const checkNameResult = await checkName(name);
  const checkPhoneResult = checkPhone(phone);
  if (checkNameResult !== true) return checkNameResult;
  if (checkPhoneResult !== true) return checkPhoneResult;
  return true;
};

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

  const handleClick = async () => {
    const checkContentsResult = await checkContents(name, phone);
    if (checkContentsResult === true) {
      if (window.confirm(CREATE_CONFIRM_MESSAGE(department, name, phone)) === true) {
        addStaff(name, getOnlyNumber(phone), department).then(() => {
          setName('');
          setPhone('');
          setDepartment('');
          onClose();
          reloadData();
        });
      }
    } else {
      setErrorMessage(checkContentsResult);
    }
  };

  useEffect(() => {
    setName('');
    setPhone('');
    setDepartment('');
    setErrorMessage('');
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.container}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.title}>직원 추가</h4>
            <p className={classes.subTitle}>추가하고자하는 직원 정보를 입력해주세요.</p>
          </CardHeader>
          <CardBody>
            <div className={classes.inputContainer}>
              <input
                name={INPUT_DEPARTMENT_NAME}
                value={department}
                onChange={handleChange}
                placeholder="소속"
                className={classes.input}
              />
              <input
                name={INPUT_NAME_NAME}
                value={name}
                onChange={handleChange}
                placeholder="이름"
                className={classes.input}
              />
              <input
                name={INPUT_PHONE_NAME}
                value={phone}
                type={'tel'}
                onChange={handleChange}
                placeholder="휴대폰 번호"
                className={classes.input}
              />
              <RegularButton
                color="info"
                onClick={() => {
                  setErrorMessage('');
                  handleClick();
                }}
                className={classes.button}
              >
                추가
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
