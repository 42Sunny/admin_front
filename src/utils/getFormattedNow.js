import moment from 'moment';

export const getFomattedNow = () => {
  return moment().format('YYYY-MM-DD');
};
