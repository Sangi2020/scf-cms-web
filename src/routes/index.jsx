import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../layout/HomeLayout';  // Assuming HomeLayout is your dashboard layout
import Overview from '../pages/dashboard/Overview';
import Analytics from '../pages/dashboard/Analytics';
import Reports from '../pages/dashboard/Reports';
import UserList from '../pages/users/UserList';
import UserProfile from '../pages/users/UserProfile';
import Settings from '../pages/settings/Settings';
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
import ProtectedRoute from  '../routes/ProtectedRoute'
import ForgotPassword from '../pages/auth/ForgotPassword';
import MailConfig from '../components/mail-config/MailConfig';
import DocumentPage from '../pages/documents/documentPage.jsx'
import SeoLayout from '../pages/seo/SEOLayout.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,  // This is the layout for your dashboard
    children: [
      {
        index: true,
        element: <ProtectedRoute><Overview /></ProtectedRoute>,
      },
      {
        path: 'analytics',
        element: <ProtectedRoute><Analytics /></ProtectedRoute>,
      },
      {
        path: 'reports',
        element: <ProtectedRoute><Reports /></ProtectedRoute>,
      },
      {
        path: 'users',
        element: <ProtectedRoute><UserList /></ProtectedRoute>,
      },
      {
        path: 'users/:id',
        element: <ProtectedRoute><UserProfile /></ProtectedRoute>,
      },
      {
        path: 'settings',
        element: <ProtectedRoute><Settings /></ProtectedRoute>,
      },
      {
        path: '/posts',
        element: <ProtectedRoute><BlogsLayout /></ProtectedRoute>,
      },
      {
        path: '/testimonials',
        element: <ProtectedRoute><TestimonialLayout /></ProtectedRoute>,
      },
      {
        path: '/social',
        element: <ProtectedRoute><SocialMediaLayout /></ProtectedRoute>,
      },
      {
        path: '/clients',
        element: <ProtectedRoute><ClientsLayout /></ProtectedRoute>,
      },
      {
        path: '/enquiries',
        element: <ProtectedRoute><EnquiriesView /></ProtectedRoute>,
      },
      {
        path: '/notifications',
        element: <ProtectedRoute><Notification /></ProtectedRoute>,
      },
      {
        path: '/team',
        element: <ProtectedRoute><TeamManagement /></ProtectedRoute>,
      },
      {
        path: '/pages',
        element: <ProtectedRoute><PageLayout /></ProtectedRoute>,
      },
      {
        path: '/help',
        element: <ProtectedRoute><HelpDocumentation /></ProtectedRoute>,
      },
      {
        path: '/newsletters',
        element: <ProtectedRoute><Newsletter /></ProtectedRoute>,
      },
      {
        path: 'mail-config',
        element: <ProtectedRoute><MailConfig/></ProtectedRoute>,
      },
      {
        path: '/documents',
        element: <ProtectedRoute><DocumentPage /></ProtectedRoute>,
      },
      {
        path: '/seo-editor',
        element: <ProtectedRoute><SeoLayout /></ProtectedRoute>,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path:'/forgot-password' ,
    element: <ForgotPassword />
  }
]);
