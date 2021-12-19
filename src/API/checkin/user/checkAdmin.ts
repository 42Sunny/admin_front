import { getToCheckin } from 'API/APISetting/checkinAPI';
import { CheckAdminArgType, CheckAdminResponseType } from '.';

export const checkAdmin = async () => {
  return await getToCheckin<CheckAdminArgType, CheckAdminResponseType>(`/user/status`);
};
