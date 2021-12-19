import { getToCheckin } from 'API/APISetting/checkinAPI';

export const getStudent = async (login: any, page: any, listSize: any) => {
  return await getToCheckin(`/log/user/${login}?page=${page}&listSize=${listSize}`);
};
