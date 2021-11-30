import { Tab, Tabs } from '@material-ui/core';
import useCriteria from 'hooks/useCriteria';
import React from 'react';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
    value: index.toString(),
  };
}

const ClusterSelector = () => {
  const {
    criteria: { clusterNumber },
    setClusterNumber,
  } = useCriteria();

  const handleChange = (event, newValue) => {
    setClusterNumber(newValue);
  };

  return (
    <Tabs
      value={clusterNumber}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
    >
      <Tab label="개포" {...a11yProps(0)} />
      <Tab label="서초" {...a11yProps(1)} />
    </Tabs>
  );
};

export default ClusterSelector;
