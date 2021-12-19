import { getCheckIn } from 'API/checkin/log';

export const updateCheckInLogs = async (setCheckInLogs, clusterNumber) => {
  try {
    const result = await getCheckIn(clusterNumber, 1);
    setCheckInLogs(result.data.list);
  } catch (err) {
    console.log(err);
  }
};
