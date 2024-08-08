import type { Department } from '@repo/database';

import { DataTable } from '~/components/ui/data-table';
import { columns } from './columns';

interface Props {
  departments?: Department[];
}

export const DepartmentTable = ({ departments }: Props) => {
  if (!departments) {
    return <></>;
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={departments.map((department) => ({
          ...department,
          onEdit: () => Promise.resolve(),
          onDelete: () => Promise.resolve()
        }))}
      />
    </>
  );
};
