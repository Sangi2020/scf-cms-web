import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../layout/HomeLayout';
import Overview from '../pages/dashboard/Overview';
import Analytics from '../pages/dashboard/Analytics';
import Reports from '../pages/dashboard/Reports';
import UserList from '../pages/users/UserList';
import UserProfile from '../pages/users/UserProfile';
import Settings from '../pages/settings/Settings';
import HomeLayout from '../layout/HomeLayout';
import LoginPage from '../pages/auth/Login';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: 'dashboard',
        children: [
          { index: true, element: <Overview /> },
          { path: 'analytics', element: <Analytics /> },
          { path: 'reports', element: <Reports /> },
        ],
      },
      {
        path: 'users',
        children: [
          { index: true, element: <UserList /> },
          { path: ':id', element: <UserProfile /> },
        ],
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  // {
  //   path: '/forgot-password',
  //   element: <ForgotPassword />,
  // },
]);