import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import GridItem from 'components/Grid/GridItem';
import React, { useEffect, useState } from 'react';
import Table from 'components/Table/Table';
import useStyles from './VisitorDashboardTableStyles';
import moment from 'moment';

const tableHead = ['예약 시간', '입실', '직원', '소속', '이름', '목적', '상태'];

const VisitorLogTable = ({ xs, sm, md, checkInLogs, clusterNumber }) => {
  const classes = useStyles();
  const [tableData, setTableData] = useState();

  useEffect(() => {
    setTableData(makeTableData(checkInLogs, clusterNumber));
  }, [checkInLogs, clusterNumber]);

  return (
    <GridItem xs={xs} sm={sm} md={md}>
      <Card>
        <CardHeader color="info">
          <h4 className={classes.title}>방문자 로그</h4>
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

const MakeData = (staffName, date, purpose, checkInTime, organization, name, status) => [
  date && new moment(date).format('HH:mm'),
  checkInTime && new moment(checkInTime).format('HH:mm'),
  staffName,
  organization,
  name,
  purpose?.length > 3 ? purpose.slice(0, 3) + '...' : purpose,
  status,
];

const makeTableData = (checkInLogs, clusterNumber) => {
  const result = [];
  checkInLogs?.forEach((elem) => {
    const { place, staffName, date, purpose, visitors } = elem;
    if (clusterNumber === '0' && place === '개포') {
      visitors.forEach(
        ({ visitorId, checkInTime, checkOutTime, organization, name, phone, status }) => {
          const temp = MakeData(staffName, date, purpose, checkInTime, organization, name, status);
          result.push(temp);
        },
      );
    }
    if (clusterNumber === '1' && place === '서초') {
      visitors.forEach((elem) => {
        visitors.forEach((visitor) => {
          const temp = MakeData(staffName, date, purpose, visitor);
          result.push(temp);
        });
      });
    }
  });
  result.reverse();
  return result;
};

export default VisitorLogTable;
