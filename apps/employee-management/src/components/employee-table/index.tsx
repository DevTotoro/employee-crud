import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { DataTable } from '~/components/ui/data-table';
import { columns } from './columns';
import { editEmployeeSchema, type EditEmployeeSchema } from '~/lib/schemas/employees.schema';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
  employees?: Employee[];

  isUpdating: boolean;
  isDeleting: boolean;

  onUpdate: (employeeId: string, values: EditEmployeeSchema) => Promise<void>;
  onDelete: (employeeId: string) => Promise<void>;
}

export const EmployeeTable = ({ employees, isUpdating, isDeleting, onUpdate, onDelete }: Props) => {
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | undefined>(undefined);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | undefined>(undefined);

  const reactHookForm = useForm<EditEmployeeSchema>({
    resolver: zodResolver(editEmployeeSchema),
    values: {
      firstName: employeeToEdit?.firstName ?? '',
      lastName: employeeToEdit?.lastName ?? ''
    }
  });

  if (!employees) {
    return <></>;
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={employees.map((employee) => ({
          ...employee,
          onEdit: () => {
            setEmployeeToEdit(employee);
          },
          onDelete: () => {
            setEmployeeToDelete(employee);
          }
        }))}
      />

      <Dialog
        open={!!employeeToEdit}
        onOpenChange={(open) => {
          if (!open) {
            setEmployeeToEdit(undefined);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit employee</DialogTitle>
          </DialogHeader>

          <Form {...reactHookForm}>
            <form
              onSubmit={(...args) =>
                void reactHookForm.handleSubmit(async (values) => {
                  if (!employeeToEdit) {
                    return;
                  }

                  await onUpdate(employeeToEdit.id, values);

                  setEmployeeToEdit(undefined);
                })(...args)
              }
              className='space-y-8'
            >
              <FormField
                control={reactHookForm.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input disabled={isUpdating} placeholder='e.g. John' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={reactHookForm.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input disabled={isUpdating} placeholder='e.g. Doe' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  variant='outline'
                  type='button'
                  disabled={isUpdating}
                  onClick={() => {
                    setEmployeeToEdit(undefined);
                  }}
                >
                  Cancel
                </Button>
                <Button type='submit' disabled={isUpdating}>
                  Update
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

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
