import dayjs from 'dayjs';
import { postToVisitor } from 'API/APISetting/visitorAPI';

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

export const getVisitorLogs = ({
  start = dayjs().format('YYYY-MM-DD'),
  end = dayjs().format('YYYY-MM-DD'),
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

  return postToVisitor('/info/log/date', data);
};
