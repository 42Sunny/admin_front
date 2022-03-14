import dayjs from 'dayjs';

export const formatDate = (format: string = 'YYYY-MM-DD', date?: Parameters<typeof dayjs>[0]) =>
  dayjs(date).format(format);

export const stringToDate = (date: any) => {
  const startHour: number = date.split(':')[0] * 1;
  const startMinute: number = date.split(':')[1] * 1;
  return dayjs().hour(startHour).minute(startMinute);
};
