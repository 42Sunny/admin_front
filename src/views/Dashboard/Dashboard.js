import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import DateRange from '@material-ui/icons/DateRange';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import moment from 'moment';
import { useContext } from 'react';
import { VisitorContext } from 'contexts/VisitorContext';
import { useFormattedPhone } from 'hooks/useFormattedPhone';
import { getFomattedNow } from 'utils/getFormattedNow';
import { MyConfCard } from 'components/MyConfCard';
import { MyLogTable } from 'components/MyLogTable';
import SearchBar from 'components/SearchBar';

const useStyles = makeStyles(styles);

const makeTableData = (checkInData) => {
  const result = [];
  checkInData.forEach((elem) => {
    const { place, staffName, date, purpose, visitors } = elem;
    visitors.forEach((elem) => {
      const temp = [
        elem.visitorId,
        place,
        date,
        staffName,
        elem.organization,
        elem.name,
        useFormattedPhone(elem.phone),
        purpose,
        elem.status,
      ];
      result.push(temp);
    });
  });
  result.reverse();
  return result;
};

const countVisitor = (checkInData) => {
  let checkin = 0;
  let total = 0;
  checkInData.forEach((elem) => {
    const { visitors } = elem;
    visitors.forEach((elem) => {
      if (elem.status === '입실') checkin++;
      total++;
    });
  });
  return [total, checkin];
};

export default function Dashboard() {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [checkIn, setCheckIn] = useState(0);
  const [totalVisitor, setTotalVisitor] = useState(0);

  const now = new moment().format('YYYY. MM. DD');
  const { checkInData, getReserve } = useContext(VisitorContext);
  const ref = useRef();

  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [listSize, setListSize] = useState(50);
  const [clusterType, setClusterType] = useState('0');
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    setTableData(makeTableData(checkInData));
    const [total, checkin] = countVisitor(checkInData);
    setTotalVisitor(total);
    setCheckIn(checkin);
  }, [checkInData]);

  useEffect(() => {
    getReserve(getFomattedNow());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h5>클러스터 인원 수</h5>
      <GridContainer>
        <MyConfCard category="개포 입장 인원" cluster="gaepo" />
        <MyConfCard category="서초 입장 인원" cluster="seocho" />
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>person_add</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>총 예약자 수</p>
              <h3 className={classes.cardTitle}>{totalVisitor}명</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                {now}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>login</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>현재 방문자 수</p>
              <h3 className={classes.cardTitle}>{checkIn}명</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                {now}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <h5>클러스터 입장 인원 정보</h5>
      <SearchBar
        type={3}
        setLogs={setLogs}
        ref={ref}
        page={page}
        setPage={setPage}
        clusterType={clusterType}
        setClusterType={setClusterType}
        setLastPage={setLastPage}
        listSize={listSize}
      />
      <MyLogTable
        logType={3}
        setListSize={setListSize}
        setLogs={setLogs}
        ref={ref}
        listSize={listSize}
        page={page}
        logs={logs}
      />
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>방문 현황</h4>
              <p className={classes.cardCategoryWhite}>{now}</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="info"
                tableHead={[
                  'ID',
                  '장소',
                  '날짜 및 시간',
                  '직원',
                  '소속',
                  '이름',
                  '번호',
                  '목적',
                  '상태',
                ]}
                tableData={tableData}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
