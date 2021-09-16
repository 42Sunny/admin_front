import React from 'react';
import { useState } from 'react';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import RegularButton from 'components/CustomButtons/Button';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { buttonLabel, cardSubTitle, cardTitle, nameLabelText, phoneLabelText } from './Variable';
import { handleChange, handleClick } from './Handler';
import { useStyles } from './Styles';

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
              <input
                name={'name'}
                value={name}
                onChange={(event) => handleChange(event, setName, setPhone)}
                placeholder={nameLabelText}
                className={classes.input}
              />
              <input
                name={'phone'}
                value={phone}
                type={'tel'}
                color={'info'}
                onChange={(event) => handleChange(event, setName, setPhone)}
                placeholder={phoneLabelText}
                className={classes.input}
              />
              <RegularButton
                color="info"
                onClick={() => {
                  handleClick(name, phone);
                }}
              >
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
