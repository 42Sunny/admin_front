import { putToCheckin, getToCheckin } from 'API/APISetting/checkinAPI';

export const setConfig = async (capacity: any) => {
  return await putToCheckin(`/config`, capacity);
};

export const getConfig = async () => {
  return await getToCheckin(`/config`);
};
