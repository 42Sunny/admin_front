import { useState } from 'react';
import GridItem from 'components/Grid/GridItem.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { forceCheckOut } from 'API/checkinApi';
import moment from 'moment';
import useCriteria from 'hooks/useCriteria';
import useCheckInLogs from 'hooks/useCheckInLogs';
import { useStyles } from './CheckinLogTableStyles';
import { getClusterName } from 'utils/getCluster';

const LOGTYPE = {
  0: '클러스터',
  1: '인트라 ID',
  2: '카드 번호',
  3: '카뎃',
};

const tableHead = ['시간', '출/입', '인트라 ID', '카드 번호', '클러스터', '강제 퇴실'];

const CheckinLogTable = ({ xs, sm, md }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    criteria: { logType, listSize },
    setListSize,
  } = useCriteria();

  const { checkInLogs, setCheckInLogs } = useCheckInLogs();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setListSize(event.target.innerText);
    setAnchorEl(null);
  };

  const checkOutOnClick = async (event) => {
    try {
      const userId = event.target.dataset.idx;
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

  const tableData = checkInLogs.map((log) => [
    moment(log.created_at).format('MM월 DD일 HH:mm') ?? null,
    logType === 3 ? log.state : log.type,
    log.login,
    log.card_no,
    getClusterName(log),
    logType === 3 || (log.User?.card_no === log.card_no && log.User?.log_id === log._id) ? (
      <button
        className="force-out-Btn"
        onClick={checkOutOnClick}
        data-idx={logType === 3 ? log._id : log?.User._id}
      >
        퇴실
      </button>
    ) : null,
  ]);

  return (
    <GridItem xs={xs} sm={sm} md={md}>
      <Card>
        <CardHeader color="info" className={classes.header}>
          <h4 className={classes.cardTitleWhite}>{LOGTYPE[logType]}</h4>
          {!(logType === 3) && (
            <div>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                variant="outlined"
                disabled={logType === 3}
              >
                size: {listSize}
              </Button>
              <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)}>
                <MenuItem onClick={handleClose}>10</MenuItem>
                <MenuItem onClick={handleClose}>30</MenuItem>
                <MenuItem onClick={handleClose}>50</MenuItem>
                <MenuItem onClick={handleClose}>100</MenuItem>
              </Menu>
            </div>
          )}
        </CardHeader>
        <CardBody>
          <div className={classes.tableBody}>
            <Table tableHeaderColor="info" tableHead={tableHead} tableData={tableData} />
          </div>
        </CardBody>
      </Card>
    </GridItem>
  );
};

export default CheckinLogTable;
