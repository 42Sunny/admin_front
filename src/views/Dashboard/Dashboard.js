import React, { useEffect, useState } from 'react';
import GridContainer from 'components/Grid/GridContainer.js';
import { useContext } from 'react';
import { VisitorContext } from 'contexts/VisitorContext';
import { getFomattedNow } from 'utils/getFormattedNow';
import { ConfigCard } from 'components/ConfigCard';
import CheckinLogTable from 'components/CheckinLogTable';
import CheckinSearchBar from 'components/CheckinSearchBar';
import VisitorLogTable from 'components/Visitor/VisitorLogTable';
import VisitorHeadCount from 'components/Visitor/VisitorHeadCount';
import PaginationRounded from 'components/Paging';
import { makeStyles } from '@material-ui/core/styles';
import useCriteria from 'hooks/useCriteria';

const styles = {
  optionBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10vh',
    minHeight: '40px',
    boxSizing: 'border-box',
  },
};

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const { checkInData, getReserve } = useContext(VisitorContext);
  const [logs, setLogs] = useState([]);

  const {
    criteria: { clusterType },
    setListSize,
    setLogType,
  } = useCriteria();

  useEffect(() => {
    getReserve(getFomattedNow());
    setListSize(10);
    setLogType(3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h5>클러스터</h5>
      <CheckinSearchBar setLogs={setLogs} isLightType={true} />
      <h5>인원 정보</h5>
      <GridContainer>
        <ConfigCard xs={12} sm={4} md={4} category="카뎃 (입실/정원)" />
        <VisitorHeadCount
          xs={12}
          sm={4}
          md={4}
          checkInData={checkInData}
          headerText={'방문자 (입실/대기)'}
        />
      </GridContainer>
      <h5>출입 정보</h5>
      <GridContainer>
        <CheckinLogTable xs={12} sm={12} md={12} logType={3} setLogs={setLogs} logs={logs} />
        <div className={classes.optionBox}>
          <PaginationRounded />
        </div>
        <VisitorLogTable
          xs={12}
          sm={12}
          md={12}
          checkInData={checkInData}
          clusterType={clusterType}
        />
      </GridContainer>
    </div>
  );
}
