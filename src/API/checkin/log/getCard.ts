import { getToCheckin } from 'API/APISetting/checkinAPI';
import { GetCardResponseType } from '.';

export const getCard = async (cardId: any, page: any, listSize: any) => {
  return await getToCheckin<null | undefined, GetCardResponseType>(
    `/log/card/${cardId}?page=${page}&listSize=${listSize}`,
  );
};
