import { getCheckIn } from 'API/checkin/log';

export const updateCheckInLogs = async (setCheckInLogs, clusterNumber) => {
  try {
    const response = await getCheckIn(clusterNumber, 1);
    setCheckInLogs(response.payload.data.list);
  } catch (err) {
    console.log(err);
  }
};
