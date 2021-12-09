import React, { useEffect, useMemo } from 'react';
import GridContainer from 'components/Grid/GridContainer.js';
import { useContext } from 'react';
import { VisitorContext } from 'contexts/VisitorContext';
import CheckinDashboardTable from 'components/Checkin/CheckinDashboardTable';
import VisitorDashboardTable from 'components/Visitor/VisitorDashboardTable';
import useCriteria from 'hooks/useCriteria';
import ClusterSelector from 'components/ClusterSelector/ClusterSelector';
import { useStyles } from './DashboardStyles';
import useCheckInLogs from 'hooks/useCheckInLogs';
import { getClusterNumber } from 'utils/getCluster';
import HeadCount from 'components/HeadCount/HeadCount';
import { updateCheckInLogs } from 'utils/updateCheckInLogs';
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

  useEffect(
    () => updateCheckInLogs(setCheckInLogs, clusterNumber),
    [clusterNumber, setCheckInLogs],
  );
  useEffect(() => getHeadCount(setMaxGaepo, setMaxSeocho), [setMaxGaepo, setMaxSeocho]);
  useEffect(() => getVisitorCheckInLogs(), [clusterNumber, getVisitorCheckInLogs]);

  const checkInEnteranceCount = useMemo(
    () => checkInLogs.filter((log) => getClusterNumber(log) === clusterNumber).length,
    [checkInLogs, clusterNumber],
  );
  const checkInMaxEnterance = clusterNumber === '0' ? maxGaepo : maxSeocho;
  const CheckInHeadCountProps = {
    title: '체크인 현황',
    targetPercent:
      checkInMaxEnterance !== 0
        ? Number.parseInt((checkInEnteranceCount / checkInMaxEnterance) * 100, 10)
        : 0,
    content: <div>{`${checkInEnteranceCount}/${checkInMaxEnterance}`}</div>,
    legends: [
      { color: 'info', content: `입실 ${checkInEnteranceCount}명` },
      { content: `총원 ${checkInMaxEnterance}명` },
    ],
  };

  const visitorEnteranceCount = visitorCheckInLogs?.filter((log) => log.status === '입실').length;
  const visitorReserveCount = visitorCheckInLogs?.length;

  const VisitorHeadCountProps = {
    title: '방문자 현황',
    targetPercent:
      visitorReserveCount !== 0
        ? Number.parseInt((visitorEnteranceCount / visitorReserveCount) * 100, 10)
        : 0,
    content: (
      <div>
        <div>{`${visitorEnteranceCount}/${visitorReserveCount}`}</div>
      </div>
    ),
    legends: [
      { color: 'info', content: `입실 ${visitorEnteranceCount}명` },
      { content: `전체 ${visitorReserveCount}명` },
    ],
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
