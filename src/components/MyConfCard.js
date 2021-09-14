import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { reqUsingCard, reqMaxCapacity } from 'api/checkinApi';

const styles2 = {
  cardWrapper: {
    display: 'flex',
    float: 'right',
  },
};

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(styles2);

export const MyConfCard = ({ category, cluster }) => {
  const classes = useStyles();
  const classes2 = useStyles2();

  const [clusterConf, setClusterConf] = useState({});
  const [clusterMaxConf, setClusterMaxConf] = useState({});

  const getUsingCard = useCallback(async () => {
    try {
      const { data } = await reqUsingCard();
      setClusterConf({
        gaepo: data.gaepo,
        seocho: data.seocho,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getMaxCapacity = useCallback(async () => {
    try {
      const { data } = await reqMaxCapacity();
      setClusterMaxConf({
        gaepo: data.maxCapGaepo,
        seocho: data.maxCapSeocho,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchData = useCallback(() => {
    getUsingCard();
    getMaxCapacity();
  }, [getUsingCard, getMaxCapacity]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <GridItem xs={3} sm={3} md={3}>
      <Card>
        <CardHeader color="info" stats icon>
          <p className={classes.cardCategory}>{category}</p>
          <div className={classes2.cardWrapper}>
            <h3 className={classes.cardTitle}>{clusterConf[cluster]}</h3>
            <h4 className={classes.cardTitle}>/{clusterMaxConf[cluster]}</h4>
          </div>
        </CardHeader>
      </Card>
    </GridItem>
  );
};
