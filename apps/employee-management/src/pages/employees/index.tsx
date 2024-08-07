import type { Employee } from '@repo/database';

import { useApi } from '~/lib/hooks/use-api';
import { EmployeeTable } from '~/components/employee-table';

export const EmployeesPage = () => {
  const { data } = useApi<Employee[]>({
    endpoint: '/employees',
    method: 'GET',
    errorMessages: {
      500: 'An error occured while fetching employees'
    }
  });

  return <EmployeeTable employees={data} />;
};
