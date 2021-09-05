import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import DescriptionIcon from '@material-ui/icons/Description';
import DashboardPage from 'admin/views/Dashboard/Dashboard.js';
import UserProfile from 'admin/views/UserProfile/UserProfile.js';
import CheckInLog from '../checkin-admin/views/CheckInLog';
import CheckInSettings from '../checkin-admin/views/CheckInSettings';

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
    path: '/checkin/settings',
    name: '체크인 설정',
    icon: SettingsIcon,
    component: CheckInSettings,
    layout: '/admin',
  },
  {
    path: '/checkin/logs',
    name: '체크인 로그',
    icon: DescriptionIcon,
    component: CheckInLog,
    layout: '/admin',
  },
];

export default dashboardRoutes;
