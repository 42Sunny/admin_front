import React from 'react';
import { useState } from 'react';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import RegularButton from 'components/CustomButtons/Button';
import CustomInput from 'components/CustomInput/CustomInput';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import {
  buttonLabel,
  cardSubTitle,
  cardTitle,
  nameLabelText,
  phoneLabelText,
} from './StaffContent';
import { handleChange, handleClick } from './StaffHandler';
import { useStyles } from './StaffStyle';

const Staff = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

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
                inputProps={{
                  name: 'name',
                  value: name,
                  onChange: (event) => handleChange(event, setName, setPhone),
                }}
                color="info"
                labelText={nameLabelText}
              />
              <CustomInput
                inputProps={{
                  name: 'phone',
                  value: phone,
                  type: 'tel',
                  color: 'info',
                  onChange: (event) => handleChange(event, setName, setPhone),
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
