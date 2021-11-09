import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PaginationRounded from '../components/Paging';
import SearchBar from '../components/SearchBar';
import { MyLogTable } from '../components/MyLogTable';

import '../assets/css/AdminPage.css';
import GridContainer from 'components/Grid/GridContainer';

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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function CheckInManagement() {
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const [logType, setLogType] = useState(0);
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);

  const [clusterType, setClusterType] = useState('0');
  const [login, setLogin] = useState('');
  const [cardId, setCardId] = useState(0);

  const [lastPage, setLastPage] = useState(1);

  const ref = useRef();

  const classes = useStyles();

  const [listSize, setListSize] = useState(50);

  const handleChange = (event, newValue) => {
    setLogs([]);
    setPage(1);
    setLogType(newValue);
    setLogin('');
    setCardId(0);
    setLastPage(0);
  };

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
        </Tabs>
      </Paper>
      <div className={classes.optionBox}>
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
          setLastPage={setLastPage}
          listSize={listSize}
          isLightType={false}
        />
      </div>
      <PaginationRounded lastPage={lastPage} setPage={setPage} />
      <GridContainer>
        <MyLogTable
          xs={12}
          sm={12}
          md={12}
          logType={logType}
          setListSize={setListSize}
          setLogs={setLogs}
          ref={ref}
          listSize={listSize}
          page={page}
          logs={logs}
        />
      </GridContainer>
    </>
  );
}

export default CheckInManagement;
