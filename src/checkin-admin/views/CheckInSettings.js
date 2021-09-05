import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import GridItem from 'admin/components/Grid/GridItem.js';
import GridContainer from 'admin/components/Grid/GridContainer.js';
import Card from 'admin/components/Card/Card.js';
import CardHeader from 'admin/components/Card/CardHeader.js';
import CardIcon from 'admin/components/Card/CardIcon.js';
import CardFooter from 'admin/components/Card/CardFooter.js';
import { Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import { grayColor } from 'admin/assets/jss/material-dashboard-react.js';

import { getMaxCapacity, setMaxCapacity } from '../api/api.js';

const styles = {
  cardCategory: {
    color: grayColor[8],
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    paddingTop: '10px',
    marginBottom: '0',
    fontWeight: 'bold',
  },
  cardTitle: {
    color: grayColor[2],
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: grayColor[1],
      fontWeight: '400',
      lineHeight: '1',
    },
  },
};

const useStyles = makeStyles(styles);
let cmpCapValue = {
  maxCapGaepo: '',
  maxCapSeocho: '',
};

const CheckInSettings = () => {
  const classes = useStyles();
  const [capacity, setCapacity] = useState({
    maxCapGaepo: '',
    maxCapSeocho: '',
  });

  const getHeadCount = async () => {
    try {
      const response = await getMaxCapacity();
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
      <Typography variant="h6">클러스터 최대 입장 인원</Typography>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="info" icon>
              <CardIcon color="info">
                <Icon>person_add</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>개포</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <TextField
                  id="maxCapGaepo"
                  value={capacity.maxCapGaepo}
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* <EditIcon className={classes.editIcon} ></EditIcon> */}
                <Button onClick={handleBlur} variant="outlined">
                  수정
                </Button>
              </div>
            </CardHeader>
            <CardFooter stats></CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="info" icon>
              <CardIcon color="info">
                <Icon>person_add</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>서초</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <TextField
                  id="maxCapSeocho"
                  value={capacity.maxCapSeocho}
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Button onClick={handleBlur} variant="outlined">
                  수정
                </Button>
                {/* <EditIcon className={classes.editIcon} onClick={handleClick}></EditIcon> */}
              </div>
            </CardHeader>
            <CardFooter stats></CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
};

export default CheckInSettings;
