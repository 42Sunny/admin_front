import { getToCheckin } from 'API/APISetting/checkinAPI';
import { GetCheckInResponseType } from '.';

const ALL_CARD_CNT = 1000;
export const getCheckIn = async (clusterNumber: string | number, page: string | number) => {
  return await getToCheckin<null | undefined, GetCheckInResponseType[]>(
    `/log/checkIn/${clusterNumber}?page=${page}&listSize=${ALL_CARD_CNT}`,
  );
};
