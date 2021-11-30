import React, { useEffect } from 'react';
import GridContainer from 'components/Grid/GridContainer.js';
import { useContext } from 'react';
import { VisitorContext } from 'contexts/VisitorContext';
import { getFomattedNow } from 'utils/getFormattedNow';
import CheckinDashboardTable from 'components/Checkin/CheckinDashboardTable';
import VisitorDashboardTable from 'components/Visitor/VisitorDashboardTable';
import useCriteria from 'hooks/useCriteria';
import ClusterSelector from 'components/ClusterSelector/ClusterSelector';
import { useStyles } from './DashboardStyles';
import { getCheckIn } from 'api/checkinApi';
import useCheckInLogs from 'hooks/useCheckInLogs';
import { getClusterNumber } from 'utils/getCluster';
import HeadCount from 'components/HeadCount/HeadCount';
import { getConfig } from 'api/checkinApi';
import { getCheckInLogs } from 'utils/getCheckInLogs';
import { getHeadCount } from 'utils/getHeadCount';

const Dashboard = () => {
  const classes = useStyles();
  const { visitorCheckInLogs, getVisitorCheckInLogs } = useContext(VisitorContext);
  const { checkInLogs, setCheckInLogs } = useCheckInLogs();
  const {
    criteria: { clusterNumber, maxGaepo, maxSeocho },
    setMaxGaepo,
    setMaxSeocho,
  } = useCriteria();

  useEffect(() => getCheckInLogs(setCheckInLogs, clusterNumber), [clusterNumber, setCheckInLogs]);
  useEffect(() => getHeadCount(setMaxGaepo, setMaxSeocho), [setMaxGaepo, setMaxSeocho]);
  useEffect(() => getVisitorCheckInLogs(getFomattedNow()), [getVisitorCheckInLogs]);

  const CheckInHeadCountProps = {
    title: '체크인 현황',
    targetPercent: Number.parseInt(
      (checkInLogs.filter((log) => getClusterNumber(log) === clusterNumber).length /
        (clusterNumber === '0' ? maxGaepo : maxSeocho)) *
        100,
      10,
    ),
    content: (
      <div>
        <div>{`입실 : ${
          checkInLogs.filter((log) => getClusterNumber(log) === clusterNumber).length
        }`}</div>
        <div>{`정원 : ${clusterNumber === '0' ? maxGaepo : maxSeocho}`}</div>
      </div>
    ),
  };

  const VisitorHeadCountProps = {
    title: '방문자 현황',
    targetPercent: Number.parseInt(
      (visitorCheckInLogs
        ?.filter(({ place }) => getClusterNumber(place) === clusterNumber)
        .reduce((cur, reserve) => [...cur, ...reserve.visitors], [])
        .filter((visitor) => visitor.status === '입실').length /
        visitorCheckInLogs
          ?.filter(({ place }) => getClusterNumber(place) === clusterNumber)
          .reduce((cur, elem) => cur + elem.visitors.length, 0)) *
        100,
      10,
    ),
    content: (
      <div>
        <div>
          {`완료 : 
          ${
            visitorCheckInLogs
              ?.filter(({ place }) => getClusterNumber(place) === clusterNumber)
              .reduce((cur, reserve) => [...cur, ...reserve.visitors], [])
              .filter((visitor) => visitor.status === '입실').length
          }`}
        </div>
        <div>{`예약 : 
          ${visitorCheckInLogs
            ?.filter(({ place, visitors }) => getClusterNumber(place) === clusterNumber)
            .reduce((cur, elem) => cur + elem.visitors.length, 0)}`}</div>
      </div>
    ),
  };

  return (
    <div className={classes.body}>
      <ClusterSelector />
      <GridContainer>
        <HeadCount xs={6} sm={6} md={6} {...CheckInHeadCountProps} />
        <HeadCount xs={6} sm={6} md={6} {...VisitorHeadCountProps} />
        <CheckinDashboardTable xs={6} sm={6} md={6} />
        <VisitorDashboardTable
          xs={6}
          sm={6}
          md={6}
          checkInLogs={visitorCheckInLogs}
          clusterNumber={clusterNumber}
        />
      </GridContainer>
    </div>
  );
};

export default Dashboard;
