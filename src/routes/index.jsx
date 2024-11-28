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
import BlogsLayout from '../pages/blogs/BlogsLayout';
import TestimonialLayout from '../pages/testimonials/TestimonialLayout';
import SocialMediaLayout from '../pages/socialmedia/SocialMediaLayout';
import ClientsLayout from '../pages/clients/ClientsLayout';
import EnquiriesView from '../components/enquiry/EnquiriesView';
import Notification from '../pages/notification/Notification';
import TeamManagement from "../pages/teams/TeamsLayout";
import PageLayout from '../pages/webpages/PageLayout';
import HelpDocumentation from '../pages/help/Help';
import Newsletter from '../pages/newsletter/Newsletter';

export const router = createBrowserRouter([
   {
    path: '/',
    element: <HomeLayout />,
    children: [
      { index:true, element: <Overview /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'reports', element: <Reports /> },
      { path: 'users', element: <UserList /> },
      { path: 'users/:id', element: <UserProfile /> },
      { path: 'settings', element: <Settings /> },
      { path: '/posts', element: <BlogsLayout /> },
      { path: '/testimonials', element: <TestimonialLayout /> },
      { path: '/social', element: <SocialMediaLayout /> },
      { path: '/clients', element: <ClientsLayout /> },
      { path: '/enquiries', element: <EnquiriesView /> },
      {path : '/notifications', element: <Notification />},
      {path : '/team', element: <TeamManagement />},
      {path : '/pages', element: <PageLayout />},
      {path : '/help', element: <HelpDocumentation />},
      {path : '/newsletters', element: <Newsletter />},
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  // {
  //   path: '/forgot-password',
  //   element: <ForgotPassword />,
  // },
]);