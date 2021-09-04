const { default: axios } = require('axios');

const url = 'https://api.visitor.dev.42seoul.io';

const apiHandler = async (method, path, data) => {
  return await axios(
    {
      method,
      url: `${url}${path}`,
      data,
    },
    { withCredentials: true },
  );
};

const getAllReserves = (date) => {
  const data = { date };
  return apiHandler('post', '/info/reserve/date', data);
};

const updateVisitorStatus = (id, status) => {
  const data = { visitor: { id, status } };
  return apiHandler('put', '/info/visitor/status', data);
};

export { apiHandler, getAllReserves, updateVisitorStatus };
