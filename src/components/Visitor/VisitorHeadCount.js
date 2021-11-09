import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import GridItem from 'components/Grid/GridItem';
import React, { useContext, useEffect, useState } from 'react';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { makeStyles } from '@material-ui/core';
import { VisitorContext } from 'contexts/VisitorContext';
import useCriteria from '../../hooks/useCriteria';

const useStyles = makeStyles(styles);
const NEW_ALERT_TIME = 5000;

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

const VisitorHeadCount = ({ xs, sm, md, checkInData, headerText }) => {
  const classes = useStyles();
  const [checkIn, setCheckIn] = useState();
  const [remain, setRemain] = useState();
  const { newVisitorAlert, setNewVisitorAlert } = useContext(VisitorContext);
  const [alertTimer, setAlertTimer] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const {
    criteria: { clusterType },
  } = useCriteria();

  const placeName = clusterType === '0' ? '개포' : '서초';

  useEffect(() => {
    const { remain, checkin } = countVisitor(checkInData, placeName);
    setCheckIn(checkin);
    setRemain(remain);
  }, [checkInData, placeName]);

  // TODO : 알림 알고리즘 다시 짤 필요가 있음.
  useEffect(() => {
    if (newVisitorAlert === true) {
      if (alertTimer !== null) clearTimeout(alertTimer);
      if (checkInData[0]?.place === placeName) {
        setIsNew(true);
        const timer = setTimeout(() => {
          setNewVisitorAlert(false);
          setIsNew(false);
        }, NEW_ALERT_TIME);
        setAlertTimer(timer);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newVisitorAlert]);

  useEffect(() => {
    if (alertTimer !== null) clearTimeout(alertTimer);
    setIsNew(false);
    setNewVisitorAlert(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeName]);

  return (
    <GridItem xs={xs} sm={sm} md={md}>
      <Card>
        <CardHeader color="info" stats icon>
          <p className={classes.cardCategory}>{headerText}</p>
          <div className={classes.cardWrapper}>
            {isNew === true && (
              <h6 className={classes.cardTitle} style={{ color: 'red', fontWeight: 'bold' }}>
                Update
              </h6>
            )}
            <h1 className={classes.cardTitle}>{checkIn}</h1>
            <h4 className={classes.cardTitle}>/{remain}</h4>
          </div>
        </CardHeader>
      </Card>
    </GridItem>
  );
};

export default VisitorHeadCount;
