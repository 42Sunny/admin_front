import { getToCheckin } from 'API/APISetting/checkinAPI';

export const getConfig = async () => {
  return await getToCheckin(`/config`);
};
