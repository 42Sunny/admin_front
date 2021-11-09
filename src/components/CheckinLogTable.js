import { useState } from 'react';
import GridItem from 'components/Grid/GridItem.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { forceCheckOut } from 'api/checkinApi';
import * as moment from 'moment';
import useCriteria from '../hooks/useCriteria';
import useCheckinLog from '../hooks/useCheckinLog';
import { whiteColor, grayColor } from 'assets/jss/material-dashboard-react.js';

const LOGTYPE = {
  0: '클러스터',
  1: '인트라 ID',
  2: '카드 번호',
  3: '카뎃',
};

const styles = {
  root: {
    flexGrow: 1,
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: 'bold',
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: grayColor[1],
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

const useStyles = makeStyles(styles);

const CheckinLogTable = ({ xs, sm, md }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    criteria: { currentPage, logType, listSize },
    setListSize,
  } = useCriteria();

  const {
    checkinLog: { logs },
    setLogs,
  } = useCheckinLog();

  const tableHead = ['ID', '시간', '출/입', '인트라 ID', '카드 번호', '클러스터', '강제 퇴실'];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setListSize(e.target.innerText);
    setAnchorEl(null);
  };

  const checkOutOnClick = async (e) => {
    try {
      const userId = e.target.dataset.idx;
      if (userId) {
        window.confirm('퇴실 처리 하시겠습니까?');
        await forceCheckOut(userId);
        setLogs([]);
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
          <Table
            tableHeaderColor="info"
            tableHead={tableHead}
            tableData={logs.map((log, idx) => {
              return [
                log._id ?? (currentPage - 1) * listSize + idx + 1,
                moment(log.created_at).format('MM월 DD일 HH:mm') ?? null,
                logType === 3 ? log.state : log.type,
                log.login,
                log.card_no,
                log.card_no > 999 ? '서초' : '개포',
                logType === 3 ||
                (log.User.card_no === log.card_no && log.User.log_id === log._id) ? (
                  <button
                    className="force-out-Btn"
                    onClick={checkOutOnClick}
                    data-idx={logType === 3 ? log._id : log.User._id}
                  >
                    퇴실 처리
                  </button>
                ) : null,
              ];
            })}
          />
        </CardBody>
      </Card>
    </GridItem>
  );
};

export default CheckinLogTable;
