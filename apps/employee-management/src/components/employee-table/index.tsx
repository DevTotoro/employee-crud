import { DataTable } from '~/components/ui/data-table';

import { columns } from './columns';

export const EmployeeTable = () => {
  return <DataTable columns={columns} data={[]} />;
};
