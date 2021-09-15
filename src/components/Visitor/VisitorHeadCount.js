import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import GridItem from 'components/Grid/GridItem';
import React, { useEffect, useState } from 'react';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(styles);

const countVisitor = (checkInData, placeName) => {
  let checkin = 0;
  let total = 0;
  let remain = 0;
  checkInData.forEach((elem) => {
    const { visitors, place } = elem;
    if (place === placeName) {
      visitors.forEach((elem) => {
        if (elem.status === '입실') checkin++;
        if (elem.status === '대기') remain++;
        total++;
      });
    }
  });

  return { total, remain, checkin };
};

const VisitorHeadCount = ({ xs, sm, md, checkInData, placeName, headerText }) => {
  const classes = useStyles();
  const [checkIn, setCheckIn] = useState();
  const [remain, setRemain] = useState();

  useEffect(() => {
    const { remain, checkin } = countVisitor(checkInData, placeName);
    setCheckIn(checkin);
    setRemain(remain);
  }, [checkInData, placeName]);

  return (
    <GridItem xs={xs} sm={sm} md={md}>
      <Card>
        <CardHeader color="info" stats icon>
          <p className={classes.cardCategory}>{headerText}</p>
          <div className={classes.cardWrapper}>
            <h1 className={classes.cardTitle}>{checkIn}</h1>
            <h4 className={classes.cardTitle}>/{remain}</h4>
          </div>
        </CardHeader>
      </Card>
    </GridItem>
  );
};

export default VisitorHeadCount;
