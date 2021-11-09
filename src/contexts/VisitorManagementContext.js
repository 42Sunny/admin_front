import { getVisitData } from 'api/visitorApi';
import { useFormattedPhone } from 'hooks/useFormattedPhone';
import moment from 'moment';
import { createContext, useEffect, useState, useCallback } from 'react';
import {
  PLACE_ALL,
  SEARCH_OPTIONS,
  SEARCH_OPTION_NAME,
  SEARCH_OPTION_ORGANIZATION,
  SEARCH_OPTION_PHONE,
  SEARCH_OPTION_STAFF_NAME,
  SEARCH_OPTION_STATUS,
} from '../views/VisitorManagement/Define';
import { debounce } from 'lodash';
import VisitStatus from 'views/VisitorManagement/VisitStatus';

const VisitorManagementContext = createContext({});

const makeTableData = (visitData) => {
  // visitData가 배열이 아닐 때, 반환
  if (!Array.isArray(visitData)) {
    return [];
  }

  const results = visitData.map((elem) => [
    elem.place,
    elem.checkInDate,
    elem.checkIn ? new moment(elem.checkIn).format('HH:mm') : '',
    elem.oraganization,
    elem.name,
    useFormattedPhone(elem.phone),
    elem.purpose,
    elem.staffName,
    useFormattedPhone(elem.staffPhone),
    <VisitStatus visitorId={elem.id} status={elem.status} />,
  ]);
  return results;
};

const VisitorManagementProvider = ({ children }) => {
  const [visitData, setVisitData] = useState([]);
  const [startDate, setStartDate] = useState(new moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(new moment().format('YYYY-MM-DD'));
  const [place, setPlace] = useState(PLACE_ALL.value);

  const [tableData, setTableData] = useState([]);
  const [searchOption, setSearchOption] = useState(SEARCH_OPTIONS[0].value);
  const [searchValue, setSearchValue] = useState('');

  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  const getData = useCallback(
    async ({ endDate, page, place, searchOption, searchValue, startDate }) => {
      const data = { start: startDate, end: endDate, page };

      if (searchValue !== '') {
        if (searchOption === SEARCH_OPTION_NAME.value) data['name'] = searchValue;
        if (searchOption === SEARCH_OPTION_ORGANIZATION.value) data['organization'] = searchValue;
        if (searchOption === SEARCH_OPTION_PHONE.value) data['phone'] = searchValue;
        if (searchOption === SEARCH_OPTION_STAFF_NAME.value) data['staffName'] = searchValue;
        if (searchOption === SEARCH_OPTION_STATUS.value) data['status'] = searchValue;
      }
      if (place !== PLACE_ALL.value) data['place'] = place;

      const response = await getVisitData(data);
      const {
        data: { error },
      } = response;
      if (!error) {
        const {
          data: { checkInLogs, lastPage },
        } = response;
        setVisitData(checkInLogs);
        setLastPage(lastPage);
      } else {
        //TODO: ERROR 처리
      }
    },
    [],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const lazyGetData = useCallback(
    debounce((arg) => getData(arg), 500),
    [],
  );

  useEffect(
    () => lazyGetData({ endDate, page, place, searchOption, searchValue, startDate }),
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
      }}
    >
      {children}
    </VisitorManagementContext.Provider>
  );
};

export { VisitorManagementContext, VisitorManagementProvider };
