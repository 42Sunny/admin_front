import { Modal } from '@material-ui/core';
import { checkStaff } from 'api/visitorApi';
import { addStaff } from 'api/visitorApi';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import RegularButton from 'components/CustomButtons/Button';
import React, { useEffect, useState } from 'react';
import { useStyles } from './Styles';

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
  const re = /^01\d{8,9}$/; // 휴대폰 번호 유효성 검사 정규표현식
  if (re.exec(filtered) !== null) return true;
  return '번호 형식이 올바르지 않습니다.';
};

const checkName = async (name) => {
  if (name === '') return '공백으로 지정할 수 없습니다.';
  const { data } = await checkStaff(name);
  if (data.code === '2000') return '이미 사용중인 이름입니다.';
  return true;
};

const checkContents = async (name, phone) => {
  const checkNameResult = await checkName(name);
  const checkPhoneResult = checkPhone(phone);
  if (checkNameResult !== true) return checkNameResult;
  if (checkPhoneResult !== true) return checkPhoneResult;
  return true;
};

const CreateStaffModal = ({ open, onClose, setChangeValue }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event, setName, setPhone) => {
    const {
      target: { value, name },
      nativeEvent: { data },
    } = event;
    if (name === 'name') setName(value);
    else if (name === 'phone' && (isNaN(data) === false || data === '-')) setPhone(value);
  };

  const handleClick = async (name, phone, setName, setPhone, handleClose) => {
    const checkContentsResult = await checkContents(name, phone);
    if (checkContentsResult === true) {
      if (
        window.confirm(`이름 : ${name}\n번호 : ${phone}\n해당 내용을 직원을 추가하시겠습니까?`) ===
        true
      ) {
        addStaff(name, getOnlyNumber(phone)).then(() => {
          setName('');
          setPhone('');
          handleClose();
          setChangeValue(true);
        });
      }
    } else {
      setErrorMessage(checkContentsResult);
    }
  };

  useEffect(() => {
    setName('');
    setPhone('');
    setErrorMessage('');
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.StaffInputBox}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>직원 추가</h4>
            <p className={classes.cardCategoryWhite}>추가하고자하는 직원 정보를 입력해주세요.</p>
          </CardHeader>
          <CardBody>
            <div className={classes.inputBox}>
              <input
                name={'name'}
                value={name}
                onChange={(event) => handleChange(event, setName, setPhone)}
                placeholder="이름"
                className={classes.input}
              />
              <input
                name={'phone'}
                value={phone}
                type={'tel'}
                color={'info'}
                onChange={(event) => handleChange(event, setName, setPhone)}
                placeholder="휴대폰 번호"
                className={classes.input}
              />
              <RegularButton
                color="info"
                onClick={() => {
                  setErrorMessage('');
                  handleClick(name, phone, setName, setPhone, onClose);
                }}
                className={classes.inputButton}
              >
                추가
              </RegularButton>
            </div>
            <div className={classes.errorBox}>{errorMessage}</div>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};

export default CreateStaffModal;
