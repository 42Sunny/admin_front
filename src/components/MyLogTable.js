import { forwardRef, useState } from 'react';
import GridItem from '../components/Grid/GridItem.js';
import GridContainer from '../components/Grid/GridContainer.js';
import Table from '../components/Table/Table.js';
import Card from '../components/Card/Card.js';
import CardHeader from '../components/Card/CardHeader.js';
import CardBody from '../components/Card/CardBody.js';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { forceCheckOut } from '../api/checkinApi';
import * as moment from 'moment';

const LOGTYPE = {
  0: '클러스터',
  1: '인트라 ID',
  2: '카드 번호',
  3: '미반납 카드',
  4: '모든 카드 정보',
};

const styles = {
  root: {
    flexGrow: 1,
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '500',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
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

export const MyLogTable = forwardRef(
  ({ logType, setListSize, setLogs, listSize, page, logs }, ref) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

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
          ref.current.onSubmit(e);
        } else {
          window.alert('유효한 인트라 ID가 아닙니다.');
        }
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info" className={classes.header}>
              <h4 className={classes.cardTitleWhite}>{LOGTYPE[logType]} 로그</h4>
              <div>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  variant="outlined"
                  disabled={logType === 3 || logType === 4}
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
            </CardHeader>
            <CardBody>
              <Table
                tableHead={tableHead}
                tableData={logs.map((log, idx) => {
                  const date = new Date(log.createdAt);
                  return [
                    log.id ?? (page - 1) * listSize + idx + 1,
                    moment(date).format('MM월 DD일 HH:mm') ?? null,
                    log.logType ?? null,
                    log.user ? log.user.userName : null,
                    log.card ? log.card.cardId.toString() : null,
                    log.card ? (log.card.type === 0 ? '개포' : '서초') : null,
                    log.user ? (
                      log.card.cardId === log.user.cardId ? (
                        <button
                          className="force-out-Btn"
                          onClick={checkOutOnClick}
                          data-idx={log.user._id}
                        >
                          퇴실 처리
                        </button>
                      ) : null
                    ) : null,
                  ];
                })}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  },
);
