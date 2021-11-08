import { VisitorManagementContext } from 'contexts/VisitorManagementContext';
import { useContext } from 'react';

// 해당 훅은 visitorManagementContext 아래에서만 사용 가능합니다.
const useVisitData = () => {
  const {
    startDate,
    setStartDate,

    endDate,
    setEndDate,

    visitData,

    place,
    setPlace,

    tableData,

    page,
    setPage,

    lastPage,
    setLastPage,
  } = useContext(VisitorManagementContext);

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
