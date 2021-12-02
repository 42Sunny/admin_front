const { useState, useMemo } = require('react');

const usePagination = (args) => {
  const [page, setPage] = useState(args?.page ?? 1);
  const [length, setLength] = useState(args?.length ?? []);
  const size = args?.size ?? 10;

  return useMemo(
    () => ({
      page,
      setPage,
      length,
      setPaginationLength: setLength,
      current: {
        start: (page - 1) * size + 1 > length ? length : (page - 1) * size + 1,
        end: page * size > length ? length : page * size,
      },
      increase: () => page < Math.ceil(length / size) && setPage((page) => page + 1),
      decrease: () => page > 1 && setPage((page) => page - 1),
    }),
    [length, page, size],
  );
};

export default usePagination;
