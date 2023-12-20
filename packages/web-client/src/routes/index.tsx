import React from 'react';
import { ProtectedRoute } from 'utils/ProtectedRouteWrapper';

import Navbar from 'components/navbar';

import { RoutesObject } from '../utils/types';

const Login = React.lazy(() => import('../pages/login'));
const SignUp = React.lazy(() => import('../pages/signUp'));
const Dashboard = React.lazy(() => import('../pages/DashboardPage'));

const routes: RoutesObject[] = [
  {
    path: '/login',
    component: <Login />,
    exact: true,
  },
  {
    path: '/sign-up',
    component: <SignUp />,
    exact: true,
  },
  {
    path: '/dashboard',
    component: (
      <ProtectedRoute>
        <Navbar>
          <Dashboard />
        </Navbar>
      </ProtectedRoute>
    ),
    exact: true,
  },
  {
    path: '/',
    component: (
      <ProtectedRoute>
        <Navbar>
          <Dashboard />
        </Navbar>
      </ProtectedRoute>
    ),
    exact: true,
  },
];
export default routes;
