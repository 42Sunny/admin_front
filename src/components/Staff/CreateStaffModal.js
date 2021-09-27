import { Modal } from '@material-ui/core';
import { addStaff } from 'api/visitorApi';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import RegularButton from 'components/CustomButtons/Button';
import React, { useState } from 'react';
import { useStyles } from './Styles';

const checkPhone = (phone) => {
  const phoneArray = Array.from(phone);
  const filteredArray = phoneArray.filter((elem) => isNaN(elem) === false);
  const filtered = filteredArray.join('');
  return filtered.length !== 11;
};

const checkName = (name) => {
  return name === '';
};

const checkContents = (name, phone) => {
  if (checkName(name) === true) return false;
  if (checkPhone(phone) === true) return false;
  return true;
};

const CreateStaffModal = ({ open, onClose, setChangeValue }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleChange = (event, setName, setPhone) => {
    const {
      target: { value, name },
      nativeEvent: { data },
    } = event;
    if (name === 'name') setName(value);
    else if (name === 'phone' && !isNaN(data)) setPhone(value);
  };

  const handleClick = (name, phone, setName, setPhone, handleClose) => {
    if (checkContents(name, phone)) {
      if (
        window.confirm(`이름 : ${name}\n번호 : ${phone}\n해당 내용을 직원을 추가하시겠습니까?`) ===
        true
      ) {
        addStaff(name, phone).then(() => {
          setName('');
          setPhone('');
          handleClose();
          setChangeValue(true);
        });
      }
    }
  };

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
                  handleClick(name, phone, setName, setPhone, onClose);
                }}
                className={classes.inputButton}
              >
                추가
              </RegularButton>
            </div>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};

export default CreateStaffModal;
