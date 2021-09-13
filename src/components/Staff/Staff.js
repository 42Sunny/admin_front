import React from 'react';
import { useState } from 'react';
import Card from '../../admin123/components/Card/Card';
import CardBody from '../../admin123/components/Card/CardBody';
import CardHeader from '../../admin123/components/Card/CardHeader';
import RegularButton from '../CustomButtons/Button';
import CustomInput from '../CustomInput/CustomInput';
import GridContainer from '../../admin123/components/Grid/GridContainer';
import GridItem from '../../admin123/components/Grid/GridItem';
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
                formControlProps={{}}
                inputProps={{
                  name: 'name',
                  value: name,
                  onChange: (event) => handleChange(event, setName, setPhone),
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