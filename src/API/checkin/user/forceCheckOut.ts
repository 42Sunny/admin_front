import { postToCheckin } from 'API/APISetting/checkinAPI';

export const forceCheckOut = async (userId: any) => {
  return await postToCheckin(`/user/forceCheckOut/${userId}`);
};
