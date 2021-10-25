const { default: axios } = require('axios');

const URL = process.env.REACT_APP_VISITOR_API_URL;
const VERSION_PATH = '/v1';
const makeApiPath = (path) => `${VERSION_PATH}${path}`;

const apiHandler = async (method, path, data) => {
  return await axios(
    {
      method,
      url: `${URL}${path}`,
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
  return apiHandler('post', makeApiPath('/info/reserve/date'), data);
};

const updateVisitorStatus = (id, status) => {
  const data = { visitor: { id, status } };
  return apiHandler('put', makeApiPath('/info/visitor/status'), data);
};

const addStaff = (name, phone) => {
  const data = { name, phone };
  return apiHandler('post', makeApiPath('/admin/staff/save'), data);
};

const deleteStaff = (staffId) => {
  const data = { staffId: Number.parseInt(staffId) };
  return apiHandler('delete', makeApiPath('/admin/staff'), data);
};

const getStaffs = () => {
  return apiHandler('get', makeApiPath('/admin/staff'), {});
};

const checkStaff = (staffName) => {
  const data = { staffName };
  return apiHandler('post', makeApiPath('/staff'), data);
};

export {
  apiHandler,
  getAllReserves,
  updateVisitorStatus,
  addStaff,
  getStaffs,
  deleteStaff,
  checkStaff,
};
