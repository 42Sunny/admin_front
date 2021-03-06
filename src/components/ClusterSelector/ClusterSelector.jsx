import React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { useStyles } from './ClusterSelectorStyles';
import useCriteria from 'store/modules/criteria/useCriteriaStore';
import { formatDate } from 'utils/formatDate';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
    value: index.toString(),
  };
}

const ClusterSelector = () => {
  const classes = useStyles();
  const {
    criteria: { clusterNumber },
    setClusterNumber,
  } = useCriteria();

  const handleChange = (event, newValue) => {
    setClusterNumber(newValue);
  };

  return (
    <div className={classes.body}>
      <Tabs
        value={clusterNumber}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="개포" {...a11yProps(0)} />
        <Tab label="서초" {...a11yProps(1)} />
      </Tabs>
      <div>{formatDate('YYYY년 MM월 DD일')}</div>
    </div>
  );
};

export default ClusterSelector;
