import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../components/Grid/GridItem.js';
import GridContainer from '../components/Grid/GridContainer.js';
import Table from '../components/Table/Table.js';
import Card from '../components/Card/Card.js';
import CardHeader from '../components/Card/CardHeader.js';
import CardBody from '../components/Card/CardBody.js';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import PaginationRounded from '../components/Paging';
import SearchBar from '../components/SearchBar';
import { forceCheckOut, checkAdmin as getCheckAdmin } from '../api/api';

import '../assets/styles/AdminPage.css';

const TEMP_MAX_PAGE = 10;
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
};

const useStyles = makeStyles(styles);

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function AdminPage() {
  const history = useHistory();
  const [logType, setLogType] = useState(0);
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);

  const [clusterType, setClusterType] = useState('0');
  const [login, setLogin] = useState('');
  const [cardId, setCardId] = useState(0);

  const ref = useRef();
  const classes = useStyles();
  const tableHead = ['ID', '시간', '출/입', '인트라 ID', '카드 번호', '클러스터', '강제 퇴실'];

  const handleChange = (event, newValue) => {
    setLogs([]);
    setPage(1);
    setLogType(newValue);
    setLogin('');
    setCardId(0);
  };

  const checkAdmin = async () => {
    try {
      const response = await getCheckAdmin();
      if (!(response.data && response.data.isAdmin)) history.push('/checkin');
    } catch (err) {
      console.log(err);
      history.push('/');
    }
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

  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          value={logType}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="클러스터" {...a11yProps(0)} />
          <Tab label="인트라 ID" {...a11yProps(1)} />
          <Tab label="카드 번호" {...a11yProps(2)} />
          <Tab label="미반납 카드" {...a11yProps(3)} />
          <Tab label="모든 카드 정보" {...a11yProps(4)} />
        </Tabs>
      </Paper>
      <SearchBar
        type={logType}
        setLogs={setLogs}
        ref={ref}
        page={page}
        setPage={setPage}
        clusterType={clusterType}
        setClusterType={setClusterType}
        login={login}
        setLogin={setLogin}
        cardId={cardId}
        setCardId={setCardId}
      />
      <PaginationRounded maxPage={TEMP_MAX_PAGE} setPage={setPage} />
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>{LOGTYPE[logType]} 로그</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="black"
                tableHead={tableHead}
                tableData={logs.map((log, idx) => {
                  const date = new Date(log.createdAt);
                  return [
                    log.id ?? (page - 1) * 50 + idx + 1,
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
    </>
  );
}

export default AdminPage;
