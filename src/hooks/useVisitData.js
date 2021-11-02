import { getVisitData } from 'api/visitorApi';
import { VisitorManagementContext } from 'contexts/VisitorManagementContext';
import moment from 'moment';
import { useCallback, useContext, useEffect } from 'react';
import { SEARCH_OPTION_PHONE } from 'views/VisitorManagement/Define';
import { SEARCH_OPTION_STATUS } from 'views/VisitorManagement/Define';
import { SEARCH_OPTION_ORGANIZATION } from 'views/VisitorManagement/Define';
import { SEARCH_OPTION_STAFF_NAME } from 'views/VisitorManagement/Define';
import { SEARCH_OPTION_NAME } from 'views/VisitorManagement/Define';
import { PLACE_GAEPO } from 'views/VisitorManagement/Define';
import { PLACE_ALL } from 'views/VisitorManagement/Define';
import { PLACE_SEOCHO } from 'views/VisitorManagement/Define';
import { useFormattedPhone } from './useFormattedPhone';
// import VisitStatus from 'views/VisitorManagement/VisitStatus';

const makeTableData = (visitData, searchOption, searchValue, placeValue) => {
  let results = [];

  // visitData가 배열이 아닐 때, 반환
  if (!Array.isArray(visitData)) {
    return [];
  }

  // 장소에 따른 데이터 필터링
  results = visitData.filter(
    (elem) =>
      placeValue === PLACE_ALL.value ||
      (elem.place === PLACE_SEOCHO.text && placeValue === PLACE_SEOCHO.value) ||
      (elem.place === PLACE_GAEPO.text && placeValue === PLACE_GAEPO.value),
  );

  // 검색에 따른 데이터 필터링
  if (searchValue !== '') {
    results = results.filter((elem) => {
      switch (searchOption) {
        case SEARCH_OPTION_NAME.value: {
          return elem?.name?.search(searchValue) !== -1;
        }
        case SEARCH_OPTION_PHONE.value: {
          return elem?.phone?.search(searchValue) !== -1;
        }
        case SEARCH_OPTION_STAFF_NAME.value: {
          return elem?.staffName?.search(searchValue) !== -1;
        }
        case SEARCH_OPTION_ORGANIZATION.value: {
          return elem?.oraganization?.search(searchValue) !== -1;
        }
        case SEARCH_OPTION_STATUS.value: {
          return elem?.status?.search(searchValue) !== -1;
        }
        default: {
          return false;
        }
      }
    });
  }

  results = results.map((elem) => [
    elem.place,
    elem.checkInDate,
    new moment(elem.checkIn).format('HH:mm'),
    elem.oraganization,
    elem.name,
    useFormattedPhone(elem.phone),
    elem.purpose,
    elem.staffName,
    useFormattedPhone(elem.staffPhone),
    elem.status,
  ]);
  return results;
};

// 해당 훅은 visitorManagementContext 아래에서만 사용 가능합니다.
const useVisitData = () => {
  const {
    startDate,
    setStartDate,

    endDate,
    setEndDate,

    visitData,
    setVisitData,

    place,
    setPlace,

    tableData,
    setTableData,

    searchOption,
    searchValue,

    page,
    setPage,

    lastPage,
    setLastPage,
  } = useContext(VisitorManagementContext);

  const getData = useCallback(
    async (startDate, endDate, page) => {
      const response = await getVisitData(startDate, endDate, page);
      const {
        data: { error },
      } = response;
      if (!error) {
        const {
          data: { checkInLogs },
        } = response;
        const {
          data: { lastPage },
        } = response;
        setVisitData(checkInLogs);
        setLastPage(lastPage);
      } else {
        //TODO: ERROR 처리
      }
    },
    [setLastPage, setVisitData],
  );

  useEffect(() => {
    getData(startDate, endDate, page);
  }, [startDate, endDate, getData, page]);

  useEffect(() => {
    const tableData = makeTableData(visitData, searchOption, searchValue, place);
    setTableData(tableData);
  }, [place, searchOption, searchValue, setTableData, visitData]);

  return {
    visitData,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    tableData,
    place,
    setPlace,
    page,
    setPage,
    lastPage,
    setLastPage,
  };
};

export default useVisitData;
