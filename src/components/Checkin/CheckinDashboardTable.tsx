import React from 'react';
import GridItem from 'components/Grid/GridItem';
import Table from 'components/Table/Table';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import useCriteria from 'store/modules/criteria/useCriteriaStore';
import useCheckInLogs from 'store/modules/checkinLogs/useCheckInLogsStore';
import { useStyles } from './CheckinDashBoardTableStyles';
import { getClusterNumber } from 'utils/getCluster';
import { forceCheckOut } from 'API/checkin/user/forceCheckOut';
import { formatDate } from 'utils/formatDate';

const tableHead = ['체크인 시간', '인트라 ID', '카드 번호', '강제 퇴실'];

type PropTypes = {
  xs: number;
  sm: number;
  md: number;
};

const CheckinLogTable = ({ xs, sm, md }: PropTypes) => {
  const classes = useStyles();
  const {
    criteria: { clusterNumber },
  } = useCriteria();

  const { checkInLogs, setCheckInLogs } = useCheckInLogs();

  const checkOutOnClick: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    try {
      const userId = event.currentTarget.id;
      if (userId) {
        window.confirm('퇴실 처리하시겠습니까?');
        await forceCheckOut(userId);
        setCheckInLogs([]);
      } else {
        window.alert('유효한 인트라 ID가 아닙니다.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GridItem xs={xs} sm={sm} md={md}>
      <Card>
        <CardHeader color="info">
          <h4 className={classes.title}>체크인 로그</h4>
          <h6 className={classes.title}>{formatDate('YYYY년 MM월 DD일')}</h6>
        </CardHeader>
        <CardBody className={classes.content}>
          <div className={classes.tableBody}>
            <Table
              tableHeaderColor="info"
              tableHead={tableHead}
              tableData={checkInLogs
                .filter((log) => clusterNumber === getClusterNumber(log))
                .map((log) => [
                  formatDate('HH:mm', log.created_at) ?? null,
                  log.login,
                  log.card_no,
                  <button
                    className="force-out-Btn"
                    onClick={checkOutOnClick}
                    key={log._id}
                    id={log._id.toString()}
                  >
                    퇴실
                  </button>,
                ])}
            />
          </div>
        </CardBody>
      </Card>
    </GridItem>
  );
};

export default CheckinLogTable;
