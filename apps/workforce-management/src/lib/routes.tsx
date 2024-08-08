import { RouteObject, Navigate } from 'react-router-dom';

import { BaseLayout } from '~/components/layouts/base';
import { EmployeesPage } from '~/pages/employees';
import { DepartmentsPage } from '~/pages/departments';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/employees' replace />
  },
  {
    element: <BaseLayout />,
    children: [
      {
        path: '/employees',
        element: <EmployeesPage />
      },
      {
        path: '/departments',
        element: <DepartmentsPage />
      }
    ]
  }
];
