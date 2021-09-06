import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'admin/components/Grid/GridItem.js';
import GridContainer from 'admin/components/Grid/GridContainer.js';
import Card from 'admin/components/Card/Card.js';
import CardHeader from 'admin/components/Card/CardHeader.js';
import CardBody from 'admin/components/Card/CardBody.js';

import Table from 'admin/components/Table/Table.js';
import moment from 'moment';
import { updateVisitorStatus } from 'admin/api/apiHandler';
import { useContext } from 'react';
import { VisitorContext } from 'admin/contexts/VisitorContext';
import { useFormattedPhone } from 'admin/hooks/useFormattedPhone';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
    fontWeight: 'bold',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: 'bold',
    marginBottom: '3px',
    textDecoration: 'none',
  },
  datePicker: {
    backgroundColor: 'rgba(255, 255, 255 ,0)',
    borderStyle: 'none',
    color: 'white',
    fontFamily: 'Spoqa Han Sans Neo',
  },
  status: {
    borderStyle: 'none',
  },
};

const useStyles = makeStyles(styles);

const Status = (props) => {
  const classes = useStyles();
  return (
    <select
      name="purpose"
      onChange={({ target: { value } }) => {
        updateVisitorStatus(props.value.visitorId, value);
      }}
      className={classes.status}
      defaultValue={props.value.status}
    >
      <option value="대기">대기</option>
      <option value="입실">입실</option>
      <option value="퇴실">퇴실</option>
    </select>
  );
};

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
        <Status value={elem} />,
      ];
      result.push(temp);
    });
  });
  result.reverse();
  return result;
};

export default function UserProfile() {
  const classes = useStyles();
  const { checkInData, getReserve } = useContext(VisitorContext);
  const [tableData, setTableData] = useState([]);
  const [date, setDate] = useState(new moment().format('YYYY-MM-DD'));

  useEffect(() => {
    getReserve(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    setTableData(makeTableData(checkInData));
  }, [checkInData]);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>출입 관리</h4>
                <p className={classes.cardCategoryWhite}>
                  <input
                    type="date"
                    value={date}
                    className={classes.datePicker}
                    onChange={({ target: { value } }) => {
                      setDate(value);
                    }}
                  />
                </p>
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
        </GridItem>
      </GridContainer>
    </div>
  );
}
