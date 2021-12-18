import moment from 'moment';
import { visitorAPIInstance } from 'API/APIInstance';
const VERSION_PATH = '/v1';
export const makeAPIPath = (path: string) => `${VERSION_PATH}${path}`;

export const postToVisitor = <T, R>(url: string, data?: T) => visitorAPIInstance.post<R>(url, data);
export const getToVisitor = <T, R>(url: string, data?: T) => visitorAPIInstance.get<R>(url, data);
export const putToVisitor = <T, R>(url: string, data?: T) => visitorAPIInstance.put<R>(url, data);
export const deleteToVisitor = <T, R>(url: string, data?: T) =>
  visitorAPIInstance.delete<R>(url, data);
export const patchToVisitor = <T, R>(url: string, data?: T) =>
  visitorAPIInstance.patch<R>(url, data);

const getAllReserves = (date: Date) => {
  const data = { date };
  return postToVisitor(makeAPIPath('/info/reserve/date'), data);
};

const updateVisitorStatus = (id: string, status: string) => {
  const data = { visitor: { id, status } };
  return putToVisitor(makeAPIPath('/info/visitor/status'), data);
};

const addStaff = (name: string, phone: string, department: string) => {
  const data = { name, phone, department };
  return postToVisitor(makeAPIPath('/admin/staff/save'), data);
};

const deleteStaff = (staffId: string) => {
  const data = { staffId: Number.parseInt(staffId) };
  return deleteToVisitor(makeAPIPath('/admin/staff'), { data });
};

const getStaffs = () => {
  return getToVisitor(makeAPIPath('/admin/staff'));
};

const checkStaff = (staffName: string) => {
  const data = { staffName };
  return postToVisitor(makeAPIPath('/staff'), data);
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

type RequestDataType = {
  start: string;
  end: string;
  pagination: {
    page: number;
    size: number;
  };
  place?: string;
  searchCriteria?: { criteria?: string; value?: string }[];
};

const getVisitorLogs = ({
  start = moment().format('YYYY-MM-DD'),
  end = moment().format('YYYY-MM-DD'),
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
  const searchCriteria: { criteria?: string; value?: string }[] = [];
  const data: RequestDataType = { start, end, pagination: { page, size } };

  if (place !== null) data.place = place;
  if (name !== null) searchCriteria.push({ criteria: criteria.visitor.name, value: name });
  if (phone !== null) searchCriteria.push({ criteria: criteria.visitor.phone, value: phone });
  if (status !== null) searchCriteria.push({ criteria: criteria.visitor.status, value: status });
  if (oraganization !== null)
    searchCriteria.push({ criteria: criteria.visitor.oraganization, value: oraganization });
  if (staffDepartment !== null)
    searchCriteria.push({ criteria: criteria.staff.department, value: staffDepartment });
  if (staffName !== null) searchCriteria.push({ criteria: criteria.staff.name, value: staffName });
  if (staffPhone !== null)
    searchCriteria.push({ criteria: criteria.staff.phone, value: staffPhone });
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
