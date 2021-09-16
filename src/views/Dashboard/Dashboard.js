import React, { useEffect, useState, useRef } from 'react';
import GridContainer from 'components/Grid/GridContainer.js';
import { useContext } from 'react';
import { VisitorContext } from 'contexts/VisitorContext';
import { getFomattedNow } from 'utils/getFormattedNow';
import { MyConfCard } from 'components/MyConfCard';
import { MyLogTable } from 'components/MyLogTable';
import SearchBar from 'components/SearchBar';
import VisitorLogTable from 'components/Visitor/VisitorLogTable';
import VisitorHeadCount from 'components/Visitor/VisitorHeadCount';
import PaginationRounded from 'components/Paging';
import { makeStyles } from '@material-ui/core/styles';
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
  const { checkInData, getReserve } = useContext(VisitorContext);
  const ref = useRef();

  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [listSize, setListSize] = useState(10);
  const [clusterType, setClusterType] = useState('0');
  // eslint-disable-next-line no-unused-vars
  const [lastPage, setLastPage] = useState(1);

  const classes = useStyles();

  useEffect(() => {
    getReserve(getFomattedNow());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h5>클러스터</h5>
      <SearchBar
        type={3}
        setLogs={setLogs}
        ref={ref}
        page={page}
        setPage={setPage}
        clusterType={clusterType}
        setClusterType={setClusterType}
        setLastPage={setLastPage}
        listSize={listSize}
        isLightType={true}
      />
      <h5>인원 정보</h5>
      <GridContainer>
        <MyConfCard
          xs={12}
          sm={2}
          md={2}
          category="카뎃 (입실/정원)"
          cluster={clusterType === '0' ? 'gaepo' : 'seocho'}
        />
        <VisitorHeadCount
          xs={12}
          sm={2}
          md={2}
          checkInData={checkInData}
          placeName={clusterType === '0' ? '개포' : '서초'}
          headerText={'방문자 (입실/대기)'}
        />
      </GridContainer>
      <h5>출입 정보</h5>
      <GridContainer>
        <MyLogTable
          xs={12}
          sm={12}
          md={12}
          logType={3}
          setListSize={setListSize}
          setLogs={setLogs}
          ref={ref}
          listSize={listSize}
          page={page}
          logs={logs}
        />
        <div className={classes.optionBox}>
          <PaginationRounded lastPage={lastPage} setPage={setPage} />
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
