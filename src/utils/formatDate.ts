import dayjs from 'dayjs';

export const formatDate = (format: string = 'YYYY-MM-DD', date?: Parameters<typeof dayjs>[0]) =>
  dayjs(date).format(format);
