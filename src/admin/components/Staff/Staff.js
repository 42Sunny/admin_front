import { makeStyles } from '@material-ui/core';
import { addStaff } from 'admin/api/apiHandler';
import { hexToRgb } from 'admin/assets/jss/material-dashboard-react';
import { grayColor } from 'admin/assets/jss/material-dashboard-react';
import { whiteColor } from 'admin/assets/jss/material-dashboard-react';
import React from 'react';
import { useState } from 'react';
import Card from '../Card/Card';
import CardBody from '../Card/CardBody';
import CardHeader from '../Card/CardHeader';
import RegularButton from '../CustomButtons/Button';
import CustomInput from '../CustomInput/CustomInput';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';

const useStyles = makeStyles({
  cardTitleWhite: {
    color: whiteColor,
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: 'bold',
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: grayColor[1],
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  cardCategoryWhite: {
    color: 'rgba(' + hexToRgb(whiteColor) + ',.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
    fontWeight: 'bold',
  },
  inputBox: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  customInput: {},
});

const Staff = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === 'name') setName(value);
    else if (name === 'phone') setPhone(value);
  };

  const checkContents = (name, phone) => {
    return true;
    // 내용을 검증한다.
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={4}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>스태프 추가</h4>
            <p className={classes.cardCategoryWhite}>추가하고자하는 스태프 정보를 입력해주세요.</p>
          </CardHeader>
          <CardBody>
            <div className={classes.inputBox}>
              <CustomInput
                inputProps={{
                  name: 'name',
                  value: name,
                  onChange: handleChange,
                }}
                color="info"
                labelText="이름"
              />
              <CustomInput
                inputProps={{
                  name: 'phone',
                  value: phone,
                  onChange: handleChange,
                }}
                color="info"
                labelText="휴대폰 번호"
              />
              <RegularButton
                color="info"
                onClick={() => {
                  if (checkContents(name, phone)) {
                    if (
                      window.confirm(
                        `이름 : ${name}\n번호 : ${phone}\n해당 내용을 직원을 추가하시겠습니까?`,
                      ) === true
                    ) {
                      addStaff(name, phone);
                    }
                  }
                }}
              >
                생성
              </RegularButton>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default Staff;
