import { ColumnDef } from '@tanstack/react-table';
import type { Employee } from '@repo/database';
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

interface TableEmployee extends Employee {
  onEdit: () => void;
  onDelete: () => void;
}

export const columns: ColumnDef<TableEmployee>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === 'asc');
        }}
      >
        Last name
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    )
  },
  {
    accessorKey: 'firstName',
    header: 'First name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
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
      const employee = row.original;

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
            <DropdownMenuItem onClick={() => void navigator.clipboard.writeText(employee.id)}>
              Copy employee ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                employee.onEdit();
              }}
            >
              Edit employee
            </DropdownMenuItem>
            <DropdownMenuItem
              className='text-red-500 focus:text-red-500'
              onClick={() => {
                employee.onDelete();
              }}
            >
              Delete employee
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
