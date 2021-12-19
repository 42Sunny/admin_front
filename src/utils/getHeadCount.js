import { getConfig } from 'API/checkin/config';

export const getHeadCount = async (setMaxGaepo, setMaxSeocho) => {
  try {
    const response = await getConfig();
    setMaxGaepo(response.data.gaepo);
    setMaxSeocho(response.data.seocho);
  } catch (err) {
    console.log(err);
  }
};
