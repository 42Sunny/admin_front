import axios from 'axios';

const CLUSTER = {
  0: 'gaepo',
  1: 'seocho',
};
const ALL_CARD_CNT = 1000;
const apiUrl = process.env.REACT_APP_CHECKIN_API_URL;
const instance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    'X-42Cadet-Auth-Key': process.env.REACT_APP_X_42CADET_CHECKIN_AUTH_KEY,
  },
});

export const checkAdmin = async () => {
  return await instance.get(`/user/status`);
};

export const forceCheckOut = async (userId) => {
  return await instance.post(`/user/forceCheckOut/${userId}`);
};

export const getCluster = async (ClusterType, page, listSize) => {
  return await instance.get(`/log/${CLUSTER[ClusterType]}?page=${page}&listSize=${listSize}`);
};

export const getStudent = async (login, page, listSize) => {
  return await instance.get(`/log/user/${login}?page=${page}&listSize=${listSize}`);
};

export const getCard = async (cardId, page, listSize) => {
  return await instance.get(`/log/card/${cardId}?page=${page}&listSize=${listSize}`);
};

export const getCheckIn = async (ClusterType, page) => {
  return await instance.get(`/log/checkIn/${ClusterType}?page=${page}&listSize=${ALL_CARD_CNT}`);
};

export const reqMaxCapacity = async (date) => {
  return await instance.get(`/config`, { params: { date } });
};

export const setMaxCapacity = async (capacity) => {
  return await instance.put(`/config`, capacity);
};

export const reqUsingCard = async () => {
  return await instance.get(`/user/using`);
};
