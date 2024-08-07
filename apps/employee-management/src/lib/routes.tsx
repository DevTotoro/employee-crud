import { RouteObject, Navigate } from 'react-router-dom';

import { EmployeesPage } from '~/pages/employees';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/employees' replace />
  },
  {
    path: '/employees',
    element: <EmployeesPage />
  }
];
