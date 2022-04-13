import { getToCheckin, postToCheckin, CheckInResponseType } from 'API/APISetting/checkinAPI';

export const checkAdmin = async () => {
  return await getToCheckin<CheckAdminArgType, CheckAdminResponseType>(`/user/status`);
};

export const forceCheckOut = async (userId: any) => {
  return await postToCheckin(`/user/forceCheckOut/${userId}`);
};

export const reqUsingCard = async () => {
  return await getToCheckin(`/user/using`);
};

export type CheckAdminArgType = null | undefined;

type CheckAdminPayloadType = {
  cluster: {
    gaepo: number;
    seocho: number;
  };
  isAdmin: boolean;
  user: {
    card: number;
    checkin_at?: string;
    checkout_at?: string;
    log_id: number;
    login: string;
    profile_image_url: string;
    state: string;
  };
};

export type CheckAdminResponseType = CheckInResponseType<CheckAdminPayloadType>;
