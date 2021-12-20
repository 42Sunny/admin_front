import dayjs from 'dayjs';

export const getFomattedNow = () => {
  return dayjs().format('YYYY-MM-DD');
};
