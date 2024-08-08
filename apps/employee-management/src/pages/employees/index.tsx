import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import type { Employee } from '@repo/database';
import { EmployeeTable } from '~/components/employee-table';
import { apiFetch } from '~/lib/api';

export const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [deletingEmployee, setDeletingEmployee] = useState(false);

  useEffect(() => {
    void getEmployees();
  }, []);

  const getEmployees = async () => {
    const res = await apiFetch<Employee[]>('/employees');

    if (!res.success) {
      toast.error('An error occured while fetching employees');
    } else {
      setEmployees(res.data);
    }
  };

  const deleteEmployee = async (employeeId: string) => {
    setDeletingEmployee(true);

    const res = await apiFetch<never>(`/employees/${employeeId}`, { method: 'DELETE' });

    setDeletingEmployee(false);

    if (!res.success) {
      toast.error('An error occured while deleting the employee');
    } else {
      await getEmployees();
    }
  };

  return <EmployeeTable employees={employees} onDelete={deleteEmployee} isDeleting={deletingEmployee} />;
};
