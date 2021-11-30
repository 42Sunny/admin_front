import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PaginationRounded from 'components/Checkin/Paging';
import CheckinSearchBar from 'components/Checkin/CheckinSearchBar';
import CheckinLogTable from 'components/Checkin/CheckinLogTable';

import 'assets/css/AdminPage.css';
import GridContainer from 'components/Grid/GridContainer';
import useCriteria from 'hooks/useCriteria';
import useCheckInLogs from 'hooks/useCheckInLogs';
import { useStyles } from './CheckInManagementStyles';
import { getCheckInLogs } from 'utils/getCheckInLogs';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const CheckInManagement = () => {
  const classes = useStyles();

  const { setCheckInLogs } = useCheckInLogs();
  const {
    criteria: { logType, clusterNumber },
    setLastPage,
    setLogType,
    setIntraId,
    setCardNum,
    setCurrentPage,
  } = useCriteria();

  useEffect(() => getCheckInLogs(setCheckInLogs, clusterNumber), [clusterNumber, setCheckInLogs]);

  const handleChange = (event, newValue) => {
    setCheckInLogs([]);
    setCurrentPage(1);
    setLogType(newValue);
    setIntraId('');
    setCardNum('');
    setLastPage(1);
  };

  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          value={logType}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="클러스터" {...a11yProps(0)} />
          <Tab label="인트라 ID" {...a11yProps(1)} />
          <Tab label="카드 번호" {...a11yProps(2)} />
          <Tab label="미반납 카드" {...a11yProps(3)} />
        </Tabs>
      </Paper>
      <div className={classes.optionBox}>
        <CheckinSearchBar />
      </div>
      <PaginationRounded />
      <GridContainer>
        <CheckinLogTable xs={12} sm={12} md={12} />
      </GridContainer>
    </>
  );
};

export default CheckInManagement;
