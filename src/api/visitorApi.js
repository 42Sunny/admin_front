import axios from 'axios';
import moment from 'moment';

const URL = process.env.REACT_APP_VISITOR_API_URL;
const VERSION_PATH = '/v1';
const makeApiPath = (path) => `${VERSION_PATH}${path}`;
// const METHOD_GET = 'get';
// const METHOD_POST = 'post';
// const METHOD_PUT = 'put';
// const METHOD_DELETE = 'delete';

// const apiHandler = async (method, path, data) => {
//   return await axios(
//     {
//       method,
//       url: `${URL}${path}`,
//       data,
//       headers: {
//         'X-42Cadet-Auth-Key': process.env.REACT_APP_X_42CADET_VISITOR_AUTH_KEY,
//       },
//     },
//     { withCredentials: true },
//   );
// };

const instance = axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: {
    'X-42Cadet-Auth-Key': process.env.REACT_APP_X_42CADET_VISITOR_AUTH_KEY,
    cookie: document.cookie,
  },
});

const getAllReserves = (date) => {
  const data = { date };
  return instance.post(makeApiPath('/info/reserve/date'), data);
};

const updateVisitorStatus = (id, status) => {
  const data = { visitor: { id, status } };
  return instance.put(makeApiPath('/info/visitor/status'), data);
};

const addStaff = (name, phone, department) => {
  const data = { name, phone, department };
  return instance.post(makeApiPath('/admin/staff/save'), data);
};

const deleteStaff = (staffId) => {
  const data = { staffId: Number.parseInt(staffId) };
  return instance.delete(makeApiPath('/admin/staff'), data);
};

const getStaffs = () => {
  return instance.get(makeApiPath('/admin/staff'));
};

const checkStaff = (staffName) => {
  const data = { staffName };
  return instance.post(makeApiPath('/staff'), data);
};

const INIT_PAGE = 0;
const INIT_SIZE = 10;
const getVisitorLogs = ({
  start = null,
  end = null,
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
  if (start === null) start = new moment().format('YYYY-MM-DD');
  if (end === null) end = new moment().format('YYYY-MM-DD');
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

  return instance.post(makeApiPath('/info/log/date'), data);
};

export {
  // apiHandler,
  getAllReserves,
  updateVisitorStatus,
  addStaff,
  getStaffs,
  deleteStaff,
  checkStaff,
  getVisitorLogs,
};
