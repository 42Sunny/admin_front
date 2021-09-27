import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';

import { grayColor } from 'assets/jss/material-dashboard-react.js';

import { reqMaxCapacity, setMaxCapacity } from '../api/checkinApi.js';
import RegularButton from 'components/CustomButtons/Button.js';
import CardBody from 'components/Card/CardBody.js';
import { hexToRgb } from 'assets/jss/material-dashboard-react';
import StaffTable from 'components/Staff/StaffTable.js';

const { whiteColor } = require('assets/jss/material-dashboard-react');

const styles = {
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
  },
  input: {
    margin: '0px',
    marginRight: '5px',
    fontSize: '1.1rem',
    borderWidth: '0px 0px 1px 0px',
    borderRadius: '0',
    padding: '0',
    width: '100%',
  },
};

const useStyles = makeStyles(styles);
let cmpCapValue = {
  maxCapGaepo: '',
  maxCapSeocho: '',
};

const Settings = () => {
  const classes = useStyles();
  const [capacity, setCapacity] = useState({
    maxCapGaepo: '',
    maxCapSeocho: '',
  });

  const getHeadCount = async () => {
    try {
      const response = await reqMaxCapacity();
      cmpCapValue = {
        maxCapGaepo: response.data.maxCapGaepo,
        maxCapSeocho: response.data.maxCapSeocho,
      };
      setCapacity(cmpCapValue);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setCapacity({
      ...capacity,
      [e.target.id]: e.target.value,
    });
  };

  const handleBlur = async (e) => {
    if (JSON.stringify(cmpCapValue) !== JSON.stringify(capacity)) {
      if (window.confirm('최대 입장 인원 값을 변경하시겠습니까?')) {
        try {
          await setMaxCapacity(capacity);
        } catch (err) {
          console.log(err);
        }
      } else {
        setCapacity(cmpCapValue);
      }
    }
  };

  useEffect(() => {
    getHeadCount();
  }, []);

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>개포</h4>
              <p className={classes.cardCategoryWhite}>
                입장 가능한 최대 카뎃 인원을 입력해주세요.
              </p>
            </CardHeader>
            <CardBody color="info" icon>
              <div
                style={{
                  display: 'flex',
                }}
              >
                <input
                  style={{
                    margin: '0px',
                    marginRight: '5px',
                    fontSize: '1.1rem',
                    borderWidth: '0px 0px 1px 0px',
                    borderRadius: '0',
                    padding: '0',
                    width: '100%',
                  }}
                  id="maxCapGaepo"
                  value={capacity.maxCapGaepo}
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <RegularButton onClick={handleBlur} color="info">
                  수정
                </RegularButton>
              </div>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>서초</h4>
              <p className={classes.cardCategoryWhite}>
                입장 가능한 최대 카뎃 인원을 입력해주세요.
              </p>
            </CardHeader>
            <CardBody color="info" icon>
              <div
                style={{
                  display: 'flex',
                }}
              >
                <input
                  style={{
                    margin: '0px',
                    marginRight: '5px',
                    fontSize: '1.1rem',
                    borderWidth: '0px 0px 1px 0px',
                    borderRadius: '0',
                    padding: '0',
                    width: '100%',
                  }}
                  id="maxCapSeocho"
                  value={capacity.maxCapSeocho}
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <RegularButton onClick={handleBlur} color="info">
                  수정
                </RegularButton>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <StaffTable />
    </>
  );
};

export default Settings;
