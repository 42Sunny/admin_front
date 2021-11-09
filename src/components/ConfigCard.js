import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { reqUsingCard, reqMaxCapacity } from 'api/checkinApi';

const useStyles = makeStyles(styles);

export const ConfigCard = ({ category, cluster, xs, sm, md }) => {
  const classes = useStyles();

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
      const today = new Date();
      const { data } = await reqMaxCapacity(today.toISOString());
      setClusterMaxConf({
        gaepo: data.gaepo,
        seocho: data.seocho,
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
    <GridItem xs={xs} sm={sm} md={md}>
      <Card>
        <CardHeader color="info" stats icon>
          <p className={classes.cardCategory}>{category}</p>
          <div className={classes.cardWrapper}>
            <h1 className={classes.cardTitle}>{clusterConf[cluster]}</h1>
            <h4 className={classes.cardTitle}>/{clusterMaxConf[cluster]}</h4>
          </div>
        </CardHeader>
      </Card>
    </GridItem>
  );
};
