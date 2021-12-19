export { checkAdmin } from './checkAdmin';
export { forceCheckOut } from './forceCheckOut';
export { reqUsingCard } from './reqUsingCard';

export type CheckAdminArgType = null | undefined;

export type CheckAdminResponseType = {
  cluster: {
    gaepo: number;
    seocho: number;
  };
  isAdmin: boolean;
  user: {
    card: number;
    card_no: number;
    checkin_at?: string;
    checkout_at?: string;
    log_id: number;
    login: string;
    profile_image_url: string;
    state: string;
    _id: number;
  };
};
