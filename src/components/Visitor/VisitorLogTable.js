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

const tableHead = ['ID', '입실', '퇴실', '직원', '소속', '이름', '번호', '목적', '상태'];

const makeTableData = (checkInData, clusterType) => {
  const result = [];
  checkInData.forEach((elem) => {
    const { place, staffName, date, purpose, visitors } = elem;

    if (clusterType === '0' && place === '개포') {
      visitors.forEach((elem) => {
        const exitTime = elem.status === '퇴실' ? new moment().format('HH:MM') : '';
        const temp = [
          elem.visitorId,
          new moment(date).format('HH:MM'),
          exitTime,
          staffName,
          elem.organization,
          elem.name,
          useFormattedPhone(elem.phone),
          purpose,
          elem.status,
        ];
        result.push(temp);
      });
    }
    if (clusterType === '1' && place === '서초') {
      visitors.forEach((elem) => {
        const exitTime = elem.status === '퇴실' ? new moment().format('HH:MM') : '';
        const temp = [
          elem.visitorId,
          new moment(date).format('HH:MM'),
          exitTime,
          staffName,
          elem.organization,
          elem.name,
          useFormattedPhone(elem.phone),
          purpose,
          elem.status,
        ];
        result.push(temp);
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

  return (
    <>
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
    </>
  );
};

export default VisitorLogTable;
