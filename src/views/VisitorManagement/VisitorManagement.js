import React, { createContext, useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Table from 'components/Table/Table.js';
import moment from 'moment';
import { updateVisitorStatus } from 'api/visitorApi';
import { useFormattedPhone } from 'hooks/useFormattedPhone';
import { getAllReserves } from 'api/visitorApi';
import { Icon } from '@material-ui/core';

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
    padding: '5px 0px 0px 0px',
    fontSize: '0.9rem',
  },
  status: {
    borderStyle: 'none',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  searchBox: {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'grey',
    borderRadius: '5px',
    width: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5px',
  },
  searchInput: {
    borderStyle: 'none',
    fontSize: '0.9rem',
    padding: '0',
  },
  searchSelect: {
    borderStyle: 'none',
    fontSize: '0.9rem',
  },
  searchIcon: { fontSize: '1.7rem' },
};

const VisitorManagementContext = createContext({});

const VisitorManagementProvider = ({ children }) => {
  const [checkInData, setCheckInData] = useState([]);
  const [date, setDate] = useState(new moment().format('YYYY-MM-DD'));

  return (
    <VisitorManagementContext.Provider value={{ checkInData, setCheckInData, date, setDate }}>
      {children}
    </VisitorManagementContext.Provider>
  );
};

const tableHead = [
  'ID',
  '장소',
  '날짜',
  '예약 시간',
  '입실',
  '퇴실',
  '직원',
  '방문자 소속',
  '방문자 이름',
  '방문자 번호',
  '방문 목적',
  '상태',
];

const selectOptions = [
  { value: 'place', name: '장소' },
  { value: 'name', name: '이름' },
  { value: 'staffName', name: '직원' },
  { value: 'organization', name: '소속' },
  { value: 'phone', name: '번호' },
  { value: 'status', name: '상태' },
];

const useStyles = makeStyles(styles);

const Status = (props) => {
  const classes = useStyles();
  const { date, setCheckInData } = useContext(VisitorManagementContext);

  return (
    <select
      name="purpose"
      onChange={async ({ target: { value } }) => {
        await updateVisitorStatus(props.value.visitorId, value);
        getAllReserves(date).then((res) => setCheckInData(res.data));
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

const makeTableData = (checkInData, selectOption, inputValue) => {
  const result = [];
  checkInData.forEach((elem) => {
    const { place, staffName, date, purpose, visitors } = elem;
    visitors.forEach((elem) => {
      const enterDate = date && new moment(date).format('YYYY-MM-DD');
      const reserveTime = date && new moment(date).format('HH:mm');
      const enterTime = elem.checkInTime && new moment(elem.checkInTime).format('HH:mm');
      const exitTime = elem.checkOutTime && new moment(elem.checkOutTime).format('HH:mm');
      const temp = [
        elem.visitorId,
        place,
        enterDate,
        reserveTime,
        enterTime,
        exitTime,
        staffName,
        elem.organization,
        elem.name,
        useFormattedPhone(elem.phone),
        purpose,
        <Status value={elem} />,
      ];
      if (inputValue === '') result.push(temp);
      else {
        if (selectOption === 'place' && place.search(inputValue) !== -1) result.push(temp);
        else if (selectOption === 'name' && elem.name.search(inputValue) !== -1) result.push(temp);
        else if (selectOption === 'staffName' && staffName.search(inputValue) !== -1)
          result.push(temp);
        else if (selectOption === 'organization' && elem.organization.search(inputValue) !== -1)
          result.push(temp);
        else if (selectOption === 'phone' && elem.phone.search(inputValue) !== -1)
          result.push(temp);
        else if (selectOption === 'status' && elem.status.search(inputValue) !== -1)
          result.push(temp);
      }
    });
  });
  result.reverse();
  return result;
};

function VisitorManagementContent() {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const { date, setDate, checkInData, setCheckInData } = useContext(VisitorManagementContext);
  const [selectOption, setSelectOption] = useState(selectOptions[0].value);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    getAllReserves(date).then((res) => setCheckInData(res.data));
  }, [date, setCheckInData]);

  useEffect(() => {
    const tableData = makeTableData(checkInData, selectOption, inputValue);
    setTableData(tableData);
  }, [checkInData, inputValue, selectOption]);

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
                <div className={classes.searchContainer}>
                  <div className={classes.searchBox}>
                    <select
                      className={classes.searchSelect}
                      value={selectOption}
                      onChange={({ target: { value } }) => setSelectOption(value)}
                    >
                      {selectOptions.map((elem, idx) => (
                        <option key={idx} value={elem.value}>
                          {elem.name}
                        </option>
                      ))}
                    </select>
                    <input
                      className={classes.searchInput}
                      placeholder="다음으로 검색"
                      value={inputValue}
                      onChange={({ target: { value }, nativeEvent: { data } }) => {
                        if (data !== '\\') setInputValue(value);
                      }}
                    />
                    <Icon className={classes.searchIcon}>search</Icon>
                  </div>
                </div>
                <Table tableHeaderColor="info" tableHead={tableHead} tableData={tableData} />
              </CardBody>
            </Card>
          </GridItem>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default function VisitorManagement() {
  return (
    <VisitorManagementProvider>
      <VisitorManagementContent />
    </VisitorManagementProvider>
  );
}
