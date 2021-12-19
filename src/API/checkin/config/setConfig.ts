import { putToCheckin } from 'API/APISetting/checkinAPI';

export const setConfig = async (capacity: any) => {
  return await putToCheckin(`/config`, capacity);
};
