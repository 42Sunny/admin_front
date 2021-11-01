import { makeStyles } from '@material-ui/core';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import GridItem from 'components/Grid/GridItem';
import React, { useEffect, useState } from 'react';
import Table from 'components/Table/Table';
import { useFormattedPhone } from 'hooks/useFormattedPhone';

import { whiteColor, grayColor } from 'assets/jss/material-dashboard-react.js';
import moment from 'moment';

const styles = {
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
};

const useStyles = makeStyles(styles);

const tableHead = [
  'ID',
  '예약 시간',
  '입실',
  '퇴실',
  '직원',
  '소속',
  '이름',
  '번호',
  '목적',
  '상태',
];

const MakeData = (
  visitorId,
  staffName,
  date,
  purpose,
  checkInTime,
  checkOutTime,
  organization,
  name,
  phone,
  status,
) => [
  visitorId,
  date && new moment(date).format('HH:mm'),
  checkInTime && new moment(checkInTime).format('HH:mm'),
  checkOutTime && new moment(checkOutTime).format('HH:mm'),
  staffName,
  organization,
  name,
  useFormattedPhone(phone),
  purpose,
  status,
];

const makeTableData = (checkInData, clusterType) => {
  const result = [];
  checkInData.forEach((elem) => {
    const { place, staffName, date, purpose, visitors } = elem;
    if (clusterType === '0' && place === '개포') {
      visitors.forEach(
        ({ visitorId, checkInTime, checkOutTime, organization, name, phone, status }) => {
          const temp = MakeData(
            visitorId,
            staffName,
            date,
            purpose,
            checkInTime,
            checkOutTime,
            organization,
            name,
            phone,
            status,
          );
          result.push(temp);
        },
      );
    }
    if (clusterType === '1' && place === '서초') {
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

const VisitorLogTable = ({ xs, sm, md, checkInData, clusterType }) => {
  const classes = useStyles();
  const [tableData, setTableData] = useState();

  useEffect(() => {
    setTableData(makeTableData(checkInData, clusterType));
  }, [checkInData, clusterType]);

  console.log(tableData);
  return (
    <GridItem xs={xs} sm={sm} md={md}>
      <Card>
        <CardHeader color="info">
          <h4 className={classes.cardTitleWhite}>방문자</h4>
        </CardHeader>
        <CardBody>
          {tableData && tableData.length !== 0 ? (
            <Table tableHeaderColor="info" tableHead={tableHead} tableData={tableData} />
          ) : (
            <h3>방문 예약이 없습니다.</h3>
          )}
        </CardBody>
      </Card>
    </GridItem>
  );
};

export default VisitorLogTable;
