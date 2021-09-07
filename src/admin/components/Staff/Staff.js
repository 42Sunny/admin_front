import { addStaff } from 'admin/api/apiHandler';
import React from 'react';
import { useState } from 'react';
import Card from '../Card/Card';
import CardBody from '../Card/CardBody';
import CardHeader from '../Card/CardHeader';
import RegularButton from '../CustomButtons/Button';
import CustomInput from '../CustomInput/CustomInput';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import { checkContents } from './checkContents';
import {
  buttonLabel,
  cardSubTitle,
  cardTitle,
  confirmMessage,
  nameLabelText,
  phoneLabelText,
} from './StaffContent';
import { useStyles } from './StaffStyle';

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

  const handleClick = () => {
    if (checkContents(name, phone)) {
      if (window.confirm(confirmMessage(name, phone)) === true) {
        addStaff(name, phone);
      }
    }
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>{cardTitle}</h4>
            <p className={classes.cardCategoryWhite}>{cardSubTitle}</p>
          </CardHeader>
          <CardBody>
            <div className={classes.inputBox}>
              <CustomInput
                formControlProps={{}}
                inputProps={{
                  name: 'name',
                  value: name,
                  onChange: handleChange,
                }}
                color="info"
                labelText={nameLabelText}
              />
              <CustomInput
                formControlProps={{}}
                inputProps={{
                  name: 'phone',
                  value: phone,
                  type: 'tel',
                  color: 'info',
                  onChange: handleChange,
                }}
                color="info"
                labelText={phoneLabelText}
              />
              <RegularButton color="info" onClick={handleClick}>
                {buttonLabel}
              </RegularButton>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default Staff;
