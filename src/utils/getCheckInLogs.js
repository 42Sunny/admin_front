import { getCheckIn } from 'api/checkinApi';

export const getCheckInLogs = async (setCheckInLogs, clusterNumber) => {
  try {
    const result = await getCheckIn(clusterNumber, 1);
    setCheckInLogs(result.data.list);
  } catch (err) {
    console.log(err);
  }
};
