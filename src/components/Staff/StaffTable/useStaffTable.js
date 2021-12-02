import { getStaffs } from 'api/visitorApi';
import { useFormattedPhone } from 'hooks/useFormattedPhone';
import { useState, useCallback, useEffect } from 'react';
import usePagination from 'hooks/usePagination';
import DeleteStaffButton from '../DeleteStaffButton';

const useStaffTable = () => {
  const [rawTableData, setRawTableData] = useState([]);
  const [searchedTableData, setSearchedTableData] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const pagination = usePagination();
  const {
    setPage,
    setPaginationLength,
    current: { start, end },
  } = pagination;

  const reloadData = useCallback(async () => {
    const { data } = await getStaffs();
    const rawTableData = makeTableData(data, reloadData);
    setRawTableData(rawTableData);
    setSearchedTableData([]);
    setSearchValue('');
    setPaginationLength(rawTableData.length);
    setPage(1);
  }, [setPage, setPaginationLength]);

  useEffect(() => {
    const data = rawTableData.filter((data) => searchValue === '' || data[1].includes(searchValue));
    setSearchedTableData(data);
    setPaginationLength(data.length);
  }, [rawTableData, searchValue, setPaginationLength]);

  useEffect(() => {
    setFilteredTableData(
      searchedTableData.filter((data, idx) => idx + 1 >= start && idx + 1 <= end),
    );
  }, [end, searchedTableData, start]);

  useEffect(() => reloadData(), [reloadData]);

  return {
    tableData: filteredTableData,
    paginationProps: pagination,
    searchValue,
    setSearchValue,
    reloadData,
  };
};

const makeTableData = (rawTableData, reloadData) =>
  rawTableData.reduce(
    (prev, cur) => [
      ...prev,
      [
        cur.department,
        cur.name,
        useFormattedPhone(cur.phone),
        <DeleteStaffButton {...cur} reloadData={reloadData} />,
      ],
    ],
    [],
  );

export default useStaffTable;
