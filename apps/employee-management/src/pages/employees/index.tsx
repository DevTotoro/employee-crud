import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import type { Employee } from '@repo/database';
import type { EditEmployeeSchema } from '~/lib/schemas/edit-employee.schema';
import { EmployeeTable } from '~/components/employee-table';
import { apiFetch } from '~/lib/api';

export const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [updatingEmployee, setUpdatingEmployee] = useState(false);
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

  const updateEmployee = async (employeeId: string, values: EditEmployeeSchema) => {
    setUpdatingEmployee(true);

    const res = await apiFetch<never>(`/employees/${employeeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });

    setUpdatingEmployee(false);

    if (!res.success) {
      toast.error('An error occured while updating the employee');
    } else {
      await getEmployees();
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

  return (
    <EmployeeTable
      employees={employees}
      isUpdating={updatingEmployee}
      isDeleting={deletingEmployee}
      onUpdate={updateEmployee}
      onDelete={deleteEmployee}
    />
  );
};
