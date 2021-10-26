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
    justifyContent: 'space-between',
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
  checkPlaceContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkPlaceBox: {
    display: 'flex',
    gap: '0.2rem',
  },
  checkLabel: {
    fontSize: '1rem',
  },
  checkBox: {
    width: '1rem',
    height: '1rem',
  },
};

const VisitorManagementContext = createContext({});

const VisitorManagementProvider = ({ children }) => {
  const [checkInData, setCheckInData] = useState([]);
  const [date, setDate] = useState(new moment().format('YYYY-MM-DD'));
  const [checkGaepo, setCheckGaepo] = useState(true);
  const [checkSeocho, setCheckSeocho] = useState(true);

  const [tableData, setTableData] = useState([]);
  const [searchOption, setSearchOption] = useState(searchOptions[0].value);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    getAllReserves(date).then((res) => setCheckInData(res.data));
  }, [date, setCheckInData]);

  useEffect(() => {
    const tableData = makeTableData(checkInData, searchOption, searchValue, [
      checkGaepo,
      checkSeocho,
    ]);
    setTableData(tableData);
  }, [checkInData, searchValue, searchOption, checkSeocho, checkGaepo]);

  return (
    <VisitorManagementContext.Provider
      value={{
        checkInData,
        setCheckInData,

        date,
        setDate,

        checkGaepo,
        setCheckGaepo,

        checkSeocho,
        setCheckSeocho,

        tableData,
        setTableData,

        searchOption,
        setSearchOption,

        searchValue,
        setSearchValue,
      }}
    >
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

const searchOptions = [
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
      name="status"
      onChange={async ({ target: { value } }) => {
        await updateVisitorStatus(props.value.visitorId, value);
        const res = await getAllReserves(date);
        setCheckInData(res.data);
      }}
      className={classes.status}
      defaultValue={props.value.status}
    >
      <option value="대기">대기</option>
      <option value="입실">입실</option>
      <option value="퇴실">퇴실</option>
      <option value="만료">만료</option>
    </select>
  );
};

const makeTableData = (checkInData, searchOption, searchValue, checks) => {
  let results = [];
  const [checkGaepo, checkSeocho] = checks;
  checkInData.forEach((elem) => {
    const { place, staffName, date, purpose, visitors } = elem;
    if ((place === '서초' && checkSeocho) || (place === '개포' && checkGaepo)) {
      visitors.forEach((visitor) => {
        const enterDate = date && new moment(date).format('YYYY-MM-DD');
        const reserveTime = date && new moment(date).format('HH:mm');
        const enterTime = visitor.checkInTime && new moment(visitor.checkInTime).format('HH:mm');
        const exitTime = visitor.checkOutTime && new moment(visitor.checkOutTime).format('HH:mm');
        const temp = [
          visitor.visitorId,
          place,
          enterDate,
          reserveTime,
          enterTime,
          exitTime,
          staffName,
          visitor.organization,
          visitor.name,
          useFormattedPhone(visitor.phone),
          purpose,
          <Status value={visitor} />,
        ];
        if (searchValue === '') results.push(temp);
        else {
          if (searchOption === 'name' && visitor.name.search(searchValue) !== -1)
            results.push(temp);
          else if (searchOption === 'staffName' && staffName.search(searchValue) !== -1)
            results.push(temp);
          else if (
            searchOption === 'organization' &&
            visitor.organization.search(searchValue) !== -1
          )
            results.push(temp);
          else if (searchOption === 'phone' && visitor.phone.search(searchValue) !== -1)
            results.push(temp);
          else if (searchOption === 'status' && visitor.status.search(searchValue) !== -1)
            results.push(temp);
        }
      });
    }
  });
  results.reverse();
  return results;
};

function VisitorManagementContent() {
  const classes = useStyles();
  const {
    setCheckGaepo,
    setCheckSeocho,
    checkSeocho,
    checkGaepo,
    date,
    setDate,
    searchOption,
    setSearchOption,
    searchValue,
    setSearchValue,
    tableData,
  } = useContext(VisitorManagementContext);

  const handleCheckSeocho = () => {
    setCheckSeocho(!checkSeocho);
  };

  const handleCheckGaepo = () => {
    setCheckGaepo(!checkGaepo);
  };

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
                  <div className={classes.checkPlaceContainer}>
                    <div className={classes.checkPlaceBox} onClick={handleCheckGaepo}>
                      <input
                        className={classes.checkBox}
                        type="checkbox"
                        checked={checkGaepo}
                        onChange={handleCheckGaepo}
                      />
                      <label className={classes.checkLabel}>개포</label>
                    </div>
                    <div className={classes.checkPlaceBox} onClick={handleCheckSeocho}>
                      <input
                        className={classes.checkBox}
                        type="checkbox"
                        checked={checkSeocho}
                        onChange={handleCheckSeocho}
                      />
                      <label className={classes.checkLabel}>서초</label>
                    </div>
                  </div>
                  <div className={classes.searchBox}>
                    <select
                      className={classes.searchSelect}
                      value={searchOption}
                      onChange={({ target: { value } }) => setSearchOption(value)}
                    >
                      {searchOptions.map((elem, idx) => (
                        <option key={idx} value={elem.value}>
                          {elem.name}
                        </option>
                      ))}
                    </select>
                    <input
                      className={classes.searchInput}
                      placeholder="다음으로 검색"
                      value={searchValue}
                      onChange={({ target: { value }, nativeEvent: { data } }) => {
                        if (data !== '\\') setSearchValue(value);
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
