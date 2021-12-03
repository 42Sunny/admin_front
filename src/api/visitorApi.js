import axios from 'axios';
import moment from 'moment';

const URL = process.env.REACT_APP_VISITOR_API_URL;
const VERSION_PATH = '/v1';
const makeAPIPath = (path) => `${VERSION_PATH}${path}`;

const instance = axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: {
    'X-42Cadet-Auth-Key': process.env.REACT_APP_X_42CADET_VISITOR_AUTH_KEY,
  },
});

const postToVisitor = (url, data) => instance.post(url, data);
const getToVisitor = (url, data) => instance.get(url, data);
const putToVisitor = (url, data) => instance.put(url, data);
const deleteToVisitor = (url, data) => instance.delete(url, data);

const getAllReserves = (date) => {
  const data = { date };
  return postToVisitor(makeAPIPath('/info/reserve/date'), data);
};

const updateVisitorStatus = (id, status) => {
  const data = { visitor: { id, status } };
  return putToVisitor(makeAPIPath('/info/visitor/status'), data);
};

const addStaff = (name, phone, department) => {
  const data = { name, phone, department };
  return postToVisitor(makeAPIPath('/admin/staff/save'), data);
};

const deleteStaff = (staffId) => {
  const data = { staffId: Number.parseInt(staffId) };
  return deleteToVisitor(makeAPIPath('/admin/staff'), data);
};

const getStaffs = () => {
  return getToVisitor(makeAPIPath('/admin/staff'));
};

const checkStaff = (staffName) => {
  const data = { staffName };
  return postToVisitor(makeAPIPath('/staff'), data);
};

const INIT_PAGE = 0;
const INIT_SIZE = 10;
const getVisitorLogs = ({
  start = new moment().format('YYYY-MM-DD'),
  end = new moment().format('YYYY-MM-DD'),
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

  return postToVisitor(makeAPIPath('/info/log/date'), data);
};

export {
  getAllReserves,
  updateVisitorStatus,
  addStaff,
  getStaffs,
  deleteStaff,
  checkStaff,
  getVisitorLogs,
};
