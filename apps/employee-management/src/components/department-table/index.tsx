import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Department } from '@repo/database';

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
import { editDepartmentSchema, type EditDepartmentSchema } from '~/lib/schemas/departments.schema';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
  departments?: Department[];

  isUpdating: boolean;
  isDeleting: boolean;

  onUpdate: (departmentId: string, values: EditDepartmentSchema) => Promise<void>;
  onDelete: (departmentId: string) => Promise<void>;
}

export const DepartmentTable = ({ departments, isUpdating, isDeleting, onUpdate, onDelete }: Props) => {
  const [departmentToEdit, setDepartmentToEdit] = useState<Department | undefined>(undefined);
  const [departmentToDelete, setDepartmentToDelete] = useState<Department | undefined>(undefined);

  const reactHookForm = useForm<EditDepartmentSchema>({
    resolver: zodResolver(editDepartmentSchema),
    values: {
      name: departmentToEdit?.name ?? ''
    }
  });

  if (!departments) {
    return <></>;
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={departments.map((department) => ({
          ...department,
          onEdit: () => {
            setDepartmentToEdit(department);
          },
          onDelete: () => {
            setDepartmentToDelete(department);
          }
        }))}
      />

      <Dialog
        open={!!departmentToEdit}
        onOpenChange={(open) => {
          if (!open) {
            setDepartmentToEdit(undefined);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit department</DialogTitle>
          </DialogHeader>

          <Form {...reactHookForm}>
            <form
              onSubmit={(...args) =>
                void reactHookForm.handleSubmit(async (values) => {
                  if (!departmentToEdit) {
                    return;
                  }

                  await onUpdate(departmentToEdit.id, values);

                  setDepartmentToEdit(undefined);
                })(...args)
              }
              className='space-y-8'
            >
              <FormField
                control={reactHookForm.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={isUpdating} placeholder='Department name...' {...field} />
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
                    setDepartmentToEdit(undefined);
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
        open={!!departmentToDelete}
        onOpenChange={(open) => {
          if (!open) {
            setDepartmentToDelete(undefined);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the department{' '}
              <span className='font-bold'>{departmentToDelete?.name}</span>. The employees in this department will not
              be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={() => {
                if (!departmentToDelete) {
                  return;
                }

                onDelete(departmentToDelete.id)
                  .then(() => {
                    setDepartmentToDelete(undefined);
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
