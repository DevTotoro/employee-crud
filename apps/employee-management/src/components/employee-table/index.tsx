import { useState } from 'react';
import type { Employee } from '@repo/database';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '~/components/ui/alert-dialog';
import { DataTable } from '~/components/ui/data-table';
import { columns } from './columns';

interface Props {
  employees?: Employee[];

  isDeleting?: boolean;

  onDelete: (employeeId: string) => Promise<void>;
}

export const EmployeeTable = ({ employees, isDeleting, onDelete }: Props) => {
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | undefined>(undefined);

  if (!employees) {
    return <></>;
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={employees.map((employee) => ({
          ...employee,
          onEdit: () => Promise.resolve(),
          onDelete: () => {
            setEmployeeToDelete(employee);
          }
        }))}
      />

      <AlertDialog
        open={!!employeeToDelete}
        onOpenChange={(open) => {
          if (!open) {
            setEmployeeToDelete(undefined);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the employee{' '}
              <span className='font-bold'>
                {employeeToDelete?.lastName} {employeeToDelete?.firstName}
              </span>
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={() => {
                if (!employeeToDelete) {
                  return;
                }

                onDelete(employeeToDelete.id)
                  .then(() => {
                    setEmployeeToDelete(undefined);
                  })
                  .catch(() => void 0);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
