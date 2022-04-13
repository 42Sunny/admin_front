import { getConfig } from 'API/checkin/config';

export const getHeadCount = async (setMaxGaepo, setMaxSeocho) => {
  try {
    const response = await getConfig();
    setMaxGaepo(response.data.payload.gaepo);
    setMaxSeocho(response.data.payload.seocho);
  } catch (err) {
    console.log(err);
  }
};
