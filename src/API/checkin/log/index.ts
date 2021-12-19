export { getCard } from './getCard';
export { getCheckIn } from './getCheckIn';
export { getCluster } from './getCluster';
export { getStudent } from './getStudent';

export type GetCardListType = {
  User: {
    card_no: number;
    log_id: number;
    login: string;
    state: string;
    _id: number;
  };
  actor: string | null;
  card_no: number;
  created_at: string | null;
  deleted_at: string | null;
  login: string;
  type: string;
  updated_at: string | null;
  _id: number;
};

export type GetCardResponseType = {
  lastPage: number;
  list: Array<{
    User: {
      card_no: number;
      log_id: number;
      login: string;
      state: string;
      _id: number;
    };
    actor: string | null;
    card_no: number;
    created_at: string | null;
    deleted_at: string | null;
    login: string;
    type: string;
    updated_at: string | null;
    _id: number;
  }>;
};

export type GetCheckInResponseType = {
  card_no: number;
  created_at: string;
  log_id: number;
  login: string;
  state: string;
  _id: number;
};

export type GetClusterListType = {
  User: {
    card_no: number;
    log_id: number;
    login: string;
    state: string;
    _id: number;
  };
  actor: string | null;
  card_no: number;
  created_at: string | null;
  deleted_at: string | null;
  login: string;
  type: string;
  updated_at: string | null;
  _id: number;
};

export type GetClusterResponseType = {
  lastPage: number;
  list: Array<{
    User: {
      card_no: number;
      log_id: number;
      login: string;
      state: string;
      _id: number;
    };
    actor: string | null;
    card_no: number;
    created_at: string | null;
    deleted_at: string | null;
    login: string;
    type: string;
    updated_at: string | null;
    _id: number;
  }>;
};
