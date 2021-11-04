const { default: axios } = require('axios');

const URL = process.env.REACT_APP_VISITOR_API_URL;
const VERSION_PATH = '/v1';
const makeApiPath = (path) => `${VERSION_PATH}${path}`;
const METHOD_GET = 'get';
const METHOD_POST = 'post';
const METHOD_PUT = 'put';
const METHOD_DELETE = 'delete';

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
  return apiHandler(METHOD_POST, makeApiPath('/info/reserve/date'), data);
};

const updateVisitorStatus = (id, status) => {
  const data = { visitor: { id, status } };
  return apiHandler(METHOD_PUT, makeApiPath('/info/visitor/status'), data);
};

const addStaff = (name, phone, department) => {
  const data = { name, phone, department };
  return apiHandler(METHOD_POST, makeApiPath('/admin/staff/save'), data);
};

const deleteStaff = (staffId) => {
  const data = { staffId: Number.parseInt(staffId) };
  return apiHandler(METHOD_DELETE, makeApiPath('/admin/staff'), data);
};

const getStaffs = () => {
  return apiHandler(METHOD_GET, makeApiPath('/admin/staff'), {});
};

const checkStaff = (staffName) => {
  const data = { staffName };
  return apiHandler(METHOD_POST, makeApiPath('/staff'), data);
};

const INIT_PAGE = 0;
const INIT_SIZE = 10;
const getVisitData = ({
  start,
  end,
  place = null,
  name = null,
  phone = null,
  status = null,
  oraganization = null,
  staffDepartment = null,
  staffName = null,
  staffPhone = null,
  page = INIT_PAGE,
  size = INIT_SIZE,
}) => {
  const searchCriteria = [];
  const data = { start, end, pagination: { page, size } };
  if (place !== null) data['place'] = place;
  if (name !== null) searchCriteria.push({ criteria: 'VISITOR_NAME', value: name });
  if (phone !== null) searchCriteria.push({ criteria: 'VISITOR_PHONE', value: phone });
  if (status !== null) searchCriteria.push({ criteria: 'VISITOR_STATUS', value: status });
  if (oraganization !== null)
    searchCriteria.push({ criteria: 'VISITOR_ORGANIZATION', value: oraganization });
  if (staffDepartment !== null)
    searchCriteria.push({ criteria: 'STAFF_DEPARTMENT', value: staffDepartment });
  if (staffName !== null) searchCriteria.push({ criteria: 'STAFF_NAME', value: staffName });
  if (staffPhone !== null) searchCriteria.push({ criteria: 'STAFF_PHONE', value: staffPhone });
  if (searchCriteria.length !== 0) data['searchCriteria'] = searchCriteria;

  return apiHandler(METHOD_POST, makeApiPath('/info/log/date'), data);
};

export {
  apiHandler,
  getAllReserves,
  updateVisitorStatus,
  addStaff,
  getStaffs,
  deleteStaff,
  checkStaff,
  getVisitData,
};
