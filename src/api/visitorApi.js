import moment from 'moment';
import forceLogout from 'utils/forceLogout';
import { isExpiredCookie } from 'utils/isExpiredCookie';
import { visitorAPIInstance } from 'API/APIInstance';
const VERSION_PATH = '/v1';
const makeAPIPath = (path) => `${VERSION_PATH}${path}`;

const authAPIToVisitor = (APIFunction) => async (url, data) => {
  if (isExpiredCookie() === true) {
    forceLogout();
    return Promise.reject({ data: { error: { message: '쿠키가 만료되었습니다.' } } });
  }
  return await APIFunction(url, data);
};

const authPostToVisitor = authAPIToVisitor(visitorAPIInstance.post);

const authGetToVisitor = authAPIToVisitor(visitorAPIInstance.get);

const authPutToVisitor = authAPIToVisitor(visitorAPIInstance.put);

const authDeleteToVisitor = authAPIToVisitor(visitorAPIInstance.delete);

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
  return authDeleteToVisitor(makeAPIPath('/admin/staff'), { data });
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

const criteria = {
  visitor: {
    name: 'VISITOR_NAME',
    phone: 'VISITOR_PHONE',
    status: 'VISITOR_STATUS',
    oraganization: 'VISITOR_ORGANIZATION',
  },
  staff: {
    department: 'STAFF_DEPARTMENT',
    name: 'STAFF_NAME',
    phone: 'STAFF_PHONE',
  },
};

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

  if (place !== null) data.place = place;
  if (name !== null) searchCriteria.push({ criteria: criteria.visitor.name, value: name });
  if (phone !== null) searchCriteria.push({ criteria: criteria.visitor.phone, value: phone });
  if (status !== null) searchCriteria.push({ criteria: criteria.visitor.status, value: status });
  if (oraganization !== null)
    searchCriteria.push({ criteria: criteria.staff.oraganization, value: oraganization });
  if (staffDepartment !== null)
    searchCriteria.push({ criteria: criteria.staff.department, value: staffDepartment });
  if (staffName !== null) searchCriteria.push({ criteria: criteria.staff.name, value: staffName });
  if (staffPhone !== null)
    searchCriteria.push({ criteria: criteria.staff.phone, value: staffPhone });
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
