import React, { useEffect } from 'react';
import GridContainer from 'components/Grid/GridContainer.js';
import { useContext } from 'react';
import { VisitorContext } from 'contexts/VisitorContext';
import { getFomattedNow } from 'utils/getFormattedNow';
import { ConfigCard } from 'components/Checkin/ConfigCard';
import CheckinLogTable from 'components/Checkin/CheckinLogTable';
import CheckinSearchBar from 'components/Checkin/CheckinSearchBar';
import VisitorLogTable from 'components/Visitor/VisitorLogTable';
import VisitorHeadCount from 'components/Visitor/VisitorHeadCount';
import PaginationRounded from 'components/Checkin/Paging';
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

const INITIAL_LIST_SIZE = 10;
const INITIAL_LOG_TYPE = 3;
const CHECKIN_HEAD_COUNT_TEXT = '카뎃 (입실/정원)';
const VISITOR_HEAD_COUNT_TEXT = '방문자 (입실/대기)';
const CLUSTER_TITLE = '클러스터';
const HEAD_COUNT_TITLE = '인원 정보';
const ENTRANCE_TITLE = '출입 정보';

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const { checkInData, getReserve } = useContext(VisitorContext);

  const {
    criteria: { clusterType },
    setListSize,
    setLogType,
  } = useCriteria();

  useEffect(() => {
    getReserve(getFomattedNow());
  }, [getReserve]);

  useEffect(() => {
    setListSize(INITIAL_LIST_SIZE);
    setLogType(INITIAL_LOG_TYPE);
  }, [setListSize, setLogType]);

  return (
    <div>
      <h5>{CLUSTER_TITLE}</h5>
      <CheckinSearchBar isLightType={true} />
      <h5>{HEAD_COUNT_TITLE}</h5>
      <GridContainer>
        <ConfigCard xs={12} sm={4} md={4} category={CHECKIN_HEAD_COUNT_TEXT} />
        <VisitorHeadCount
          xs={12}
          sm={4}
          md={4}
          checkInData={checkInData}
          headerText={VISITOR_HEAD_COUNT_TEXT}
        />
      </GridContainer>
      <h5>{ENTRANCE_TITLE}</h5>
      <GridContainer>
        <CheckinLogTable xs={12} sm={12} md={12} />
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
