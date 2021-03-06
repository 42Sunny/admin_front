import React from 'react';
import { useFormattedPhone } from 'hooks/useFormattedPhone';
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
import { getVisitorLogs } from 'API/visitor/info';
import { formatDate } from 'utils/formatDate';

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
  const [startDate, setStartDate] = useState(formatDate('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(formatDate('YYYY-MM-DD'));
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

  const updateAllData = useCallback(async ({ startDate, endDate, place }) => {
    const allData = await updateData(setAllData, {
      startDate,
      endDate,
      place,
      size: 10000,
    });
    setAllCount({
      all: allData.length,
      wait: allData.filter((data) => data.status === '??????').length,
      enterance: allData.filter((data) => data.status === '??????').length,
      expired: allData.filter((data) => data.status === '??????').length,
      exit: allData.filter((data) => data.status === '??????').length,
    });
  }, []);

  const lazyGetData = useMemo(
    () =>
      debounce(
        (setData, dataArg, dataAllArg) =>
          Promise.all([updateData(setData, dataArg), updateAllData(dataAllArg)]),
        500,
      ),
    [updateAllData],
  );

  useEffect(
    () =>
      lazyGetData(
        setVisitData,
        {
          endDate,
          page,
          place,
          searchOption,
          searchValue,
          startDate,
          setLastPage,
        },
        { startDate, endDate, place },
      ),
    [endDate, lazyGetData, page, place, searchOption, searchValue, startDate],
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
  const criteria = { start: startDate, end: endDate, page, size };

  if (searchValue !== '') {
    if (searchOption === SEARCH_OPTION_ORGANIZATION.value) criteria['organization'] = searchValue;
    if (searchOption === SEARCH_OPTION_STAFF_NAME.value) criteria['staffName'] = searchValue;
    if (searchOption === SEARCH_OPTION_STATUS.value) criteria['status'] = searchValue;
    if (searchOption === SEARCH_OPTION_PHONE.value) criteria['phone'] = searchValue;
    if (searchOption === SEARCH_OPTION_NAME.value) criteria['name'] = searchValue;
  }
  if (place !== PLACE_ALL.value) criteria['place'] = place;
  if (size) criteria['size'] = Number.parseInt(size, 10);

  const { data, error } = await getVisitorLogs(criteria);
  if (error !== undefined) return [];
  const { checkInLogs, lastPage } = data;
  setData(checkInLogs);
  if (setLastPage) setLastPage(lastPage);
  return checkInLogs;
};

const makeTableData = (visitData) => {
  if (!Array.isArray(visitData)) {
    return [];
  }

  const results = visitData.map((elem) => [
    elem.place,
    elem.reserveDate ? formatDate('YYYY-MM-DD', elem.reserveDate) : '',
    elem.organization,
    elem.name,
    useFormattedPhone(elem.phone),
    elem.purpose,
    elem.staffName,
    useFormattedPhone(elem.staffPhone),
    elem.reserveDate ? formatDate('HH:mm', elem.reserveDate) : '',
    elem.checkIn ? (
      formatDate('HH:mm', elem.checkIn)
    ) : (
      <CheckinButton visitorId={elem.id} status={elem.status} />
    ),
    elem.checkOut ? (
      formatDate('HH:mm', elem.checkOut)
    ) : (
      <CheckoutButton visitorId={elem.id} status={elem.status} />
    ),
    <VisitStatus visitorId={elem.id} defaultStatus={elem.status} />,
  ]);
  return results;
};

export { VisitorManagementContext, VisitorManagementProvider };
