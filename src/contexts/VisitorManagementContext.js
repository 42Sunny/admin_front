import moment from 'moment';
import { createContext, useState } from 'react';
import { PLACE_ALL, SEARCH_OPTIONS } from '../views/VisitorManagement/Define';

const VisitorManagementContext = createContext({});

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
