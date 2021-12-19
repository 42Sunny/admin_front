import { getToCheckin } from 'API/APISetting/checkinAPI';
import { GetClusterResponseType } from '.';

const CLUSTER = {
  0: 'gaepo',
  1: 'seocho',
};
export const getCluster = async (ClusterNumber: '0' | '1', page: any, listSize: any) => {
  return await getToCheckin<null | undefined, GetClusterResponseType>(
    `/log/${CLUSTER[ClusterNumber]}?page=${page}&listSize=${listSize}`,
  );
};
