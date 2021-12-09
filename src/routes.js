import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import DescriptionIcon from '@material-ui/icons/Description';
import DashboardPage from 'views/Dashboard/Dashboard';
import VisitorManagement from 'views/VisitorManagement/VisitorManagementContainer';
import CheckInManagement from 'views/CheckInManagement/CheckInManagement';
import Settings from 'views/Settings/Settings';
import { Business } from '@material-ui/icons';
import OrganizationManagement from 'views/OrganizationManagement/OrganizationManagement';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: '클러스터 대시보드',
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
    path: '/organization/management',
    name: '업체 출입 관리',
    icon: Business,
    component: OrganizationManagement,
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
