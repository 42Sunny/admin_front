import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import DescriptionIcon from '@material-ui/icons/Description';
import DashboardPage from 'views/Dashboard/Dashboard.js';
import VisitorManagement from 'views/VisitorManagement/VisitorManagement.js';
import CheckInManagement from 'views/CheckInManagement';
import Settings from 'views/Settings';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: '대시보드',
    icon: Dashboard,
    component: DashboardPage,
    layout: '',
  },
  {
    path: '/checkin/management',
    name: '카뎃 출입 관리',
    icon: DescriptionIcon,
    component: CheckInManagement,
    layout: '',
  },
  {
    path: '/visitor/management',
    name: '방문자 출입 관리',
    icon: Person,
    component: VisitorManagement,
    layout: '',
  },
  {
    path: '/settings',
    name: '설정',
    icon: SettingsIcon,
    component: Settings,
    layout: '',
  },
];

export default dashboardRoutes;
