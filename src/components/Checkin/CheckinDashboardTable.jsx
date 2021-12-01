import GridItem from 'components/Grid/GridItem.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import { forceCheckOut } from 'api/checkinApi';
import moment from 'moment';
import useCriteria from 'hooks/useCriteria';
import useCheckInLogs from 'hooks/useCheckInLogs';
import { useStyles } from './CheckinDashBoardTableStyles';
import { getClusterNumber } from 'utils/getCluster';

const tableHead = ['체크인 시간', '인트라 ID', '카드 번호', '강제 퇴실'];

const CheckinLogTable = ({ xs, sm, md }) => {
  const classes = useStyles();
  const {
    criteria: { clusterNumber },
  } = useCriteria();

  const { checkInLogs, setCheckInLogs } = useCheckInLogs();

  const checkOutOnClick = async (event) => {
    try {
      const userId = event.target.id;
      if (userId) {
        window.confirm('퇴실 처리 하시겠습니까?');
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
          <h6 className={classes.title}>{moment().format('YYYY년 MM월 DD일')}</h6>
        </CardHeader>
        <CardBody className={classes.content}>
          <div className={classes.tableBody}>
            <Table
              tableHeaderColor="info"
              tableHead={tableHead}
              tableData={checkInLogs
                .filter((log) => clusterNumber === getClusterNumber(log))
                .map((log, idx) => [
                  moment(log.created_at).format('HH:mm') ?? null,
                  log.login,
                  log.card_no,
                  <button className="force-out-Btn" onClick={checkOutOnClick} id={log._id}>
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
