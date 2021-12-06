import { getVisitorLogs } from 'api/visitorApi';
import { useFormattedPhone } from 'hooks/useFormattedPhone';
import moment from 'moment';
import { createContext, useEffect, useState, useCallback, useMemo } from 'react';
import {
  PLACE_ALL,
  SEARCH_OPTIONS,
  SEARCH_OPTION_NAME,
  SEARCH_OPTION_ORGANIZATION,
  SEARCH_OPTION_PHONE,
  SEARCH_OPTION_STAFF_NAME,
  SEARCH_OPTION_STATUS,
} from 'views/VisitorManagement/Define';
import { debounce } from 'lodash';
import VisitStatus from 'views/VisitorManagement/VisitStatus';
import CheckoutButton from 'components/CheckoutButton/CheckoutButton';
import CheckinButton from 'components/CheckinButton/CheckinButton';

const VisitorManagementContext = createContext({
  visitData: [],
  setVisitData: (any) => {},

  startDate: '',
  setStartDate: (any) => {},

  endDate: '',
  setEndDate: (any) => {},

  place: '',
  setPlace: (any) => {},

  tableData: [],
  setTableData: (any) => {},

  searchOption: '',
  setSearchOption: (any) => {},

  searchValue: '',
  setSearchValue: (any) => {},

  page: 0,
  setPage: (any) => {},

  lastPage: 0,
  setLastPage: (any) => {},

  allData: [],
  allCount: 0,
  updateTable: (any) => {},
  reloadData: () => {},
});

const VisitorManagementProvider = ({ children }) => {
  const [visitData, setVisitData] = useState([]);
  const [startDate, setStartDate] = useState(new moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(new moment().format('YYYY-MM-DD'));
  const [place, setPlace] = useState(PLACE_ALL.value);
  const [allData, setAllData] = useState([]);
  const [allCount, setAllCount] = useState({
    wait: 0,
    enterance: 0,
    exit: 0,
    expired: 0,
    all: 0,
  });

  const [tableData, setTableData] = useState([]);
  const [searchOption, setSearchOption] = useState(SEARCH_OPTIONS[0].value);
  const [searchValue, setSearchValue] = useState('');

  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  const updateAllData = useCallback(async (startDate, { endDate, place }) => {
    const allData = await updateData(setAllData, {
      startDate,
      endDate,
      place,
      size: 10000,
    });
    setAllCount({
      all: allData.length,
      wait: allData.filter((data) => data.status === '대기').length,
      enterance: allData.filter((data) => data.status === '입실').length,
      expired: allData.filter((data) => data.status === '만료').length,
      exit: allData.filter((data) => data.status === '퇴실').length,
    });
  }, []);

  const lazyGetData = useMemo(() => debounce((setData, arg) => updateData(setData, arg), 500), []);

  const lazyGetAllData = useMemo(
    () => debounce((startDate, arg) => updateAllData(startDate, arg), 500),
    [updateAllData],
  );

  useEffect(
    () =>
      lazyGetData(setVisitData, {
        endDate,
        page,
        place,
        searchOption,
        searchValue,
        startDate,
        setLastPage,
      }),
    [endDate, lazyGetData, page, place, searchOption, searchValue, startDate],
  );
  useEffect(
    () => lazyGetAllData(startDate, { endDate, place }),
    [endDate, lazyGetAllData, place, startDate, updateAllData],
  );
  useEffect(() => setTableData(makeTableData(visitData)), [visitData]);
  useEffect(() => setPage(0), [startDate, endDate, searchValue, searchOption]);

  return (
    <VisitorManagementContext.Provider
      value={{
        visitData,
        setVisitData,

        startDate,
        setStartDate,

        endDate,
        setEndDate,

        place,
        setPlace,

        tableData,
        setTableData,

        searchOption,
        setSearchOption,

        searchValue,
        setSearchValue,

        page,
        setPage,

        lastPage,
        setLastPage,

        allData,
        allCount,

        reloadData: () => {
          lazyGetData(setVisitData, {
            endDate,
            page,
            place,
            searchOption,
            searchValue,
            startDate,
            setLastPage,
          });
          lazyGetAllData(startDate, { endDate, place });
        },
      }}
    >
      {children}
    </VisitorManagementContext.Provider>
  );
};

const updateData = async (
  setData,
  { endDate, page, place, searchOption, searchValue, startDate, size, setLastPage },
) => {
  const data = { start: startDate, end: endDate, page, size };

  if (searchValue !== '') {
    if (searchOption === SEARCH_OPTION_ORGANIZATION.value) data['organization'] = searchValue;
    if (searchOption === SEARCH_OPTION_STAFF_NAME.value) data['staffName'] = searchValue;
    if (searchOption === SEARCH_OPTION_STATUS.value) data['status'] = searchValue;
    if (searchOption === SEARCH_OPTION_PHONE.value) data['phone'] = searchValue;
    if (searchOption === SEARCH_OPTION_NAME.value) data['name'] = searchValue;
  }
  if (place !== PLACE_ALL.value) data['place'] = place;
  if (size) data['size'] = Number.parseInt(size, 10);

  const response = await getVisitorLogs(data);
  const {
    data: { error },
  } = response;
  if (!error) {
    const {
      data: { checkInLogs, lastPage },
    } = response;
    setData(checkInLogs);
    if (setLastPage) setLastPage(lastPage);
    return checkInLogs;
  } else {
    //TODO: ERROR 처리
    return [];
  }
};

const makeTableData = (visitData) => {
  if (!Array.isArray(visitData)) {
    return [];
  }

  const results = visitData.map((elem) => [
    elem.place,
    elem.reserveDate ? moment(elem.reserveDate).format('YYYY-MM-DD') : '',
    elem.organization,
    elem.name,
    useFormattedPhone(elem.phone),
    elem.purpose,
    elem.staffName,
    useFormattedPhone(elem.staffPhone),
    elem.reserveDate ? moment(elem.reserveDate).format('HH:mm') : '',
    elem.checkIn ? (
      moment(elem.checkIn).format('HH:mm')
    ) : (
      <CheckinButton visitorId={elem.id} status={elem.status} />
    ),
    elem.checkOut ? (
      moment(elem.checkOut).format('HH:mm')
    ) : (
      <CheckoutButton visitorId={elem.id} status={elem.status} />
    ),
    <VisitStatus visitorId={elem.id} defaultStatus={elem.status} />,
  ]);
  return results;
};

export { VisitorManagementContext, VisitorManagementProvider };
