import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import type { Department } from '@repo/database';
import { Button } from '~/components/ui/button';
import { DepartmentTable } from '~/components/department-table';
import { apiFetch } from '~/lib/api';

export const DepartmentsPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    void getDepartments();
  }, []);

  const getDepartments = async () => {
    const res = await apiFetch<Department[]>('/departments');

    if (!res.success) {
      toast.error('An error occured while fetching departments');
    } else {
      setDepartments(res.data);
    }
  };

  return (
    <div className='flex flex-col w-full gap-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Departments</h1>

        <Button className='w-fit'>Create department</Button>
      </div>

      <DepartmentTable departments={departments} />
    </div>
  );
};
