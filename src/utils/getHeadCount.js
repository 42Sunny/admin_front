import { getConfig } from 'API/checkin/config';

export const getHeadCount = async (setMaxGaepo, setMaxSeocho) => {
  try {
    const { data: payload } = await getConfig();
    setMaxGaepo(payload.gaepo);
    setMaxSeocho(payload.seocho);
  } catch (err) {
    console.log(err);
  }
};
