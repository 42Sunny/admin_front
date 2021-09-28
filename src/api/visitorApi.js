const { default: axios } = require('axios');

const url = process.env.REACT_APP_VISITOR_API_URL;

const apiHandler = async (method, path, data) => {
  return await axios(
    {
      method,
      url: `${url}${path}`,
      data,
      headers: {
        'X-42Cadet-Auth-Key': process.env.REACT_APP_X_42CADET_VISITOR_AUTH_KEY,
      },
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

const addStaff = (name, phone) => {
  const data = { name, phone };
  return apiHandler('post', '/admin/staff/save', data);
};

export { apiHandler, getAllReserves, updateVisitorStatus, addStaff };
