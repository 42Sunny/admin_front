import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import DescriptionIcon from '@material-ui/icons/Description';
import DashboardPage from 'views/Dashboard/Dashboard.js';
import UserProfile from 'views/UserProfile/UserProfile.js';
import CheckInLog from 'views/CheckInLog';
import CheckInSettings from 'views/CheckInSettings';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: '대시보드',
    icon: Dashboard,
    component: DashboardPage,
    layout: '',
  },
  {
    path: '/user',
    name: '출입 관리',
    icon: Person,
    component: UserProfile,
    layout: '',
  },
  {
    path: '/checkin/settings',
    name: '체크인 설정',
    icon: SettingsIcon,
    component: CheckInSettings,
    layout: '',
  },
  {
    path: '/checkin/logs',
    name: '체크인 로그',
    icon: DescriptionIcon,
    component: CheckInLog,
    layout: '',
  },
];

export default dashboardRoutes;
