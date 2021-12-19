import { getToCheckin } from 'API/APISetting/checkinAPI';

export const reqUsingCard = async () => {
  return await getToCheckin(`/user/using`);
};
