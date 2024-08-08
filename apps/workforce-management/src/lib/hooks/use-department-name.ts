import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import type { Department } from '@repo/database';
import { apiFetch } from '../api';

export const useDepartmentName = (departmentId: string | undefined) => {
  const [departments, setDepartments] = useState<Department[]>([]);

  if (!departmentId) {
    return 'No department';
  }

  useEffect(() => {
    const getDepartments = async () => {
      const res = await apiFetch<Department[]>('/departments');

      if (!res.success) {
        toast.error('An error occured while fetching departments');
      } else {
        setDepartments(res.data);
      }
    };

    void getDepartments();
  }, []);

  return departments.find((department) => department.id === departmentId)?.name ?? 'Unknown';
};
