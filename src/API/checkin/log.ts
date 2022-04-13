import { CheckInResponseType, getToCheckin } from 'API/APISetting/checkinAPI';

export const getCard = async (cardId: any, page: any, listSize: any) => {
  return await getToCheckin<null | undefined, GetCardResponseType>(
    `/log/card/${cardId}?page=${page}&listSize=${listSize}`,
  );
};

const ALL_CARD_CNT = 1000;
export const getCheckIn = async (clusterNumber: string | number, page: string | number) => {
  return await getToCheckin<null | undefined, GetCheckInResponseType[]>(
    `/log/checkIn/${clusterNumber}?page=${page}&listSize=${ALL_CARD_CNT}`,
  );
};

const CLUSTER = {
  0: 'gaepo',
  1: 'seocho',
};
export const getCluster = async (ClusterNumber: '0' | '1', page: any, listSize: any) => {
  return await getToCheckin<null | undefined, GetClusterResponseType>(
    `/log/${CLUSTER[ClusterNumber]}?page=${page}&listSize=${listSize}`,
  );
};

export const getStudent = async (login: any, page: any, listSize: any) => {
  return await getToCheckin(`/log/user/${login}?page=${page}&listSize=${listSize}`);
};

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

export type GetCardResponseType = CheckInResponseType<{
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
}>;

export type GetCheckInResponseType = CheckInResponseType<{
  card_no: number;
  created_at: string;
  log_id: number;
  login: string;
  state: string;
  _id: number;
}>;

export type GetClusterResponseType = CheckInResponseType<{
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
}>;
