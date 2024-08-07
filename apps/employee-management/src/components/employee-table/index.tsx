import type { Employee } from '@repo/database';

import { DataTable } from '~/components/ui/data-table';
import { columns } from './columns';

interface Props {
  employees?: Employee[];
}

export const EmployeeTable = ({ employees }: Props) => {
  if (!employees) {
    return <></>;
  }

  return <DataTable columns={columns} data={employees} />;
};
