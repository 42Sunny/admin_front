import { getAllReserves } from 'api/visitorApi';
import moment from 'moment';
import { createContext, useEffect, useState } from 'react';
import { SEARCH_OPTIONS } from './Define';
import makeTableData from './makeTableData';

const VisitorManagementContext = createContext({});

const VisitorManagementProvider = ({ children }) => {
  const [checkInData, setCheckInData] = useState([]);
  const [date, setDate] = useState(new moment().format('YYYY-MM-DD'));
  const [checkGaepo, setCheckGaepo] = useState(true);
  const [checkSeocho, setCheckSeocho] = useState(true);

  const [tableData, setTableData] = useState([]);
  const [searchOption, setSearchOption] = useState(SEARCH_OPTIONS[0].value);
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

export { VisitorManagementContext, VisitorManagementProvider };
