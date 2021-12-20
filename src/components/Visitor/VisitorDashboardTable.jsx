import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import GridItem from 'components/Grid/GridItem';
import React, { useEffect, useState } from 'react';
import Table from 'components/Table/Table';
import useStyles from './VisitorDashboardTableStyles';
import dayjs from 'dayjs';

const tableHead = ['예약 시간', '입실 시간', '퇴실 시간', '직원', '소속', '방문자', '목적', '상태'];

const VisitorLogTable = ({ xs, sm, md, checkInLogs, clusterNumber }) => {
  const classes = useStyles();
  const [tableData, setTableData] = useState();

  useEffect(() => {
    setTableData(makeTableData(checkInLogs));
  }, [checkInLogs, clusterNumber]);

  return (
    <GridItem xs={xs} sm={sm} md={md}>
      <Card>
        <CardHeader color="info">
          <h4 className={classes.title}>방문자 로그</h4>
          <h6 className={classes.title}>{dayjs().format('YYYY년 MM월 DD일')}</h6>
        </CardHeader>
        <CardBody className={classes.content}>
          {tableData?.length ? (
            <Table tableHeaderColor="info" tableHead={tableHead} tableData={tableData} />
          ) : (
            <h3>방문 예약이 없습니다.</h3>
          )}
        </CardBody>
      </Card>
    </GridItem>
  );
};

const makeRow = ({
  staffName,
  reserveDate,
  purpose,
  checkIn,
  checkOut,
  organization,
  name,
  status,
}) => [
  reserveDate && dayjs(reserveDate).format('HH:mm'),
  checkIn && dayjs(checkIn).format('HH:mm'),
  checkOut && dayjs(checkOut).format('HH:mm'),
  staffName,
  organization,
  name,
  purpose?.length > 3 ? purpose.slice(0, 3) + '...' : purpose,
  status,
];

const makeTableData = (checkInLogs) => (checkInLogs ? checkInLogs.map((log) => makeRow(log)) : []);

export default VisitorLogTable;
