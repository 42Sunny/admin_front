import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import DashboardPage from 'admin/views/Dashboard/Dashboard.js';
import UserProfile from 'admin/views/UserProfile/UserProfile.js';
import AdminPage from '../checkin-admin/views/AdminPage';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: '대시보드',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
  },
  {
    path: '/user',
    name: '출입 관리',
    icon: Person,
    component: UserProfile,
    layout: '/admin',
  },
  {
    path: '/checkin',
    name: '체크인 관리',
    icon: Person,
    component: AdminPage,
    layout: '/admin',
  },
];

export default dashboardRoutes;
