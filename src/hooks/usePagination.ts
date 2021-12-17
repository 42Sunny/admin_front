import { useState, useMemo, useCallback } from 'react';

type ArgsType = {
  page?: number;
  length?: number;
  size?: number;
};

const usePagination = (args: ArgsType = {}) => {
  const [page, setPage] = useState(args?.page ?? 1);
  const [length, setLength] = useState(args?.length ?? 0);
  const size = args?.size ?? 10;
  const lastPage = useMemo(() => Math.ceil(length / size), [length, size]);

  return {
    page,
    current: {
      start: (page - 1) * size + 1 > length ? length : (page - 1) * size + 1,
      end: page * size > length ? length : page * size,
    },
    paginationLength: length,
    setPage,
    setPaginationLength: setLength,
    increase: useCallback(() => setPage((page) => (page < lastPage ? page + 1 : page)), [lastPage]),
    decrease: useCallback(() => setPage((page) => (page > 1 ? page - 1 : page)), []),
  };
};

export default usePagination;
