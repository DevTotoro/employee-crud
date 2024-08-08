import { ColumnDef } from '@tanstack/react-table';
import type { Department } from '@repo/database';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';
import { Button } from '~/components/ui/button';

interface TableDepartment extends Department {
  onEdit: () => void;
  onDelete: () => void;
}

export const columns: ColumnDef<TableDepartment>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === 'asc');
        }}
      >
        Name
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    )
  },
  {
    accessorKey: 'createdAt',
    header: 'Creation Date',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString()
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last Updated',
    cell: ({ row }) => new Date(row.original.updatedAt).toLocaleDateString()
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const department = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => void navigator.clipboard.writeText(department.id)}>
              Copy department ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                department.onEdit();
              }}
            >
              Edit department
            </DropdownMenuItem>
            <DropdownMenuItem
              className='text-red-500 focus:text-red-500'
              onClick={() => {
                department.onDelete();
              }}
            >
              Delete department
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
