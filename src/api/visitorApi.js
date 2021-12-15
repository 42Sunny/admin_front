import moment from 'moment';
import forceLogout from 'utils/forceLogout';
import { isExpiredCookie } from 'utils/isExpiredCookie';
import { visitorAPIInstance } from './APIHandler';
const VERSION_PATH = '/v1';
const makeAPIPath = (path) => `${VERSION_PATH}${path}`;

const authPostToVisitor = async (url, data) => {
  if (isExpiredCookie() === true) {
    forceLogout();
    return Promise.reject({ data: { error: { message: '쿠키가 만료되었습니다.' } } });
  } else {
    return await visitorAPIInstance.post(url, data);
  }
};

const authGetToVisitor = async (url, data) => {
  if (isExpiredCookie() === true) {
    return forceLogout();
  }
  return await visitorAPIInstance.get(url, data);
};

const authPutToVisitor = async (url, data) => {
  if (isExpiredCookie() === true) {
    return forceLogout();
  }
  return await visitorAPIInstance.put(url, data);
};

const authDeleteToVisitor = async (url, data) => {
  if (isExpiredCookie() === true) {
    return forceLogout();
  }
  return await visitorAPIInstance.delete(url, { data });
};

const getAllReserves = (date) => {
  const data = { date };
  return authPostToVisitor(makeAPIPath('/info/reserve/date'), data);
};

const updateVisitorStatus = (id, status) => {
  const data = { visitor: { id, status } };
  return authPutToVisitor(makeAPIPath('/info/visitor/status'), data);
};

const addStaff = (name, phone, department) => {
  const data = { name, phone, department };
  return authPostToVisitor(makeAPIPath('/admin/staff/save'), data);
};

const deleteStaff = (staffId) => {
  const data = { staffId: Number.parseInt(staffId) };
  return authDeleteToVisitor(makeAPIPath('/admin/staff'), data);
};

const getStaffs = () => {
  return authGetToVisitor(makeAPIPath('/admin/staff'));
};

const checkStaff = (staffName) => {
  const data = { staffName };
  return authPostToVisitor(makeAPIPath('/staff'), data);
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

  return authPostToVisitor(makeAPIPath('/info/log/date'), data);
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
