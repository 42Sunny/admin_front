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
    try {
      const { data } = await getStaffs();
      const rawTableData = makeTableData(data, reloadData);
      setRawTableData(rawTableData);
      setPaginationLength(rawTableData.length);
      setSearchValue('');
      setPage(1);
      // TODO : 불러오는데 에러가 발생하면 그것을 처리할 로직이 필요하다.
    } catch {
      setRawTableData([]);
      setPaginationLength(0);
      setSearchValue('');
      setPage(1);
    }
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
  Array.isArray(rawTableData)
    ? rawTableData.reduce(
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
      )
    : [];

export default useStaffTable;
