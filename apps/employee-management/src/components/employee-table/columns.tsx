import { ColumnDef } from '@tanstack/react-table';
import type { Employee } from '@repo/database';

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name'
  },
  {
    accessorKey: 'firstName',
    header: 'First Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'createdAt',
    header: 'Creation Date'
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last Updated'
  }
];
