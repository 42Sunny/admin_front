import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';
// import { reqUsingCard, reqMaxCapacity } from 'API/checkin';
import useCriteria from 'store/modules/criteria/useCriteriaStore';
import { reqUsingCard } from 'API/checkin/user/reqUsingCard';

const useStyles = makeStyles(styles);

export const CheckinHeadCount = ({ category, xs, sm, md }) => {
  const classes = useStyles();
  const {
    criteria: { clusterNumber },
  } = useCriteria();

  const [clusterConf, setClusterConf] = useState({});
  const [clusterMaxConf, setClusterMaxConf] = useState({});

  const cluster = clusterNumber === '0' ? 'gaepo' : 'seocho';

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

  // const getMaxCapacity = useCallback(async () => {
  //   try {
  //     const { data } = await reqMaxCapacity();
  //     setClusterMaxConf({
  //       gaepo: data.gaepo,
  //       seocho: data.seocho,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  const fetchData = useCallback(() => {
    getUsingCard();
    // getMaxCapacity();
    // }, [getUsingCard, getMaxCapacity]);
  }, [getUsingCard]);

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
