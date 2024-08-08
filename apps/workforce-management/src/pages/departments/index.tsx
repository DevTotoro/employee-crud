import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import type { Department } from '@repo/database';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import {
  createDepartmentSchema,
  type EditDepartmentSchema,
  type CreateDepartmentSchema
} from '~/lib/schemas/departments.schema';
import { DepartmentTable } from '~/components/department-table';
import { apiFetch } from '~/lib/api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const DepartmentsPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [createDepartmentDialog, setCreateDepartmentDialog] = useState(false);
  const [creatingDepartment, setCreatingDepartment] = useState(false);
  const [updatingDepartment, setUpdatingDepartment] = useState(false);
  const [deletingDepartment, setDeletingDepartment] = useState(false);

  const reactHookForm = useForm<CreateDepartmentSchema>({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: {
      name: ''
    }
  });

  useEffect(() => {
    void getDepartments();
  }, []);

  const getDepartments = async () => {
    const res = await apiFetch<Department[]>('/departments');

    if (!res.success) {
      toast.error('An error occured while fetching departments');
    } else {
      setDepartments(res.data);
    }
  };

  const createDepartment = async (values: CreateDepartmentSchema) => {
    setCreatingDepartment(true);

    const res = await apiFetch<never>('/departments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });

    setCreatingDepartment(false);

    if (!res.success) {
      toast.error('An error occured while creating the department');
    } else {
      await getDepartments();
    }
  };

  const updateDepartment = async (departmentId: string, values: EditDepartmentSchema) => {
    setUpdatingDepartment(true);

    const res = await apiFetch<never>(`/departments/${departmentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });

    setUpdatingDepartment(false);

    if (!res.success) {
      toast.error('An error occured while updating the department');
    } else {
      await getDepartments();
    }
  };

  const deleteDepartment = async (departmentId: string) => {
    setDeletingDepartment(true);

    const res = await apiFetch<never>(`/departments/${departmentId}`, { method: 'DELETE' });

    setDeletingDepartment(false);

    if (!res.success) {
      toast.error('An error occured while deleting the department');
    } else {
      await getDepartments();
    }
  };

  return (
    <>
      <div className='flex flex-col w-full gap-8'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl font-bold'>Departments</h1>

          <Button
            className='w-fit'
            onClick={() => {
              setCreateDepartmentDialog(true);
            }}
          >
            Create department
          </Button>
        </div>

        <DepartmentTable
          departments={departments}
          isUpdating={updatingDepartment}
          isDeleting={deletingDepartment}
          onUpdate={updateDepartment}
          onDelete={deleteDepartment}
        />
      </div>

      <Dialog
        open={createDepartmentDialog}
        onOpenChange={(open) => {
          if (!open) {
            setCreateDepartmentDialog(false);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create department</DialogTitle>
          </DialogHeader>

          <Form {...reactHookForm}>
            <form
              onSubmit={(...args) =>
                void reactHookForm.handleSubmit(async (values) => {
                  await createDepartment(values);

                  setCreateDepartmentDialog(false);
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
                      <Input disabled={creatingDepartment} placeholder='Department name...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  variant='outline'
                  type='button'
                  disabled={creatingDepartment}
                  onClick={() => {
                    setCreateDepartmentDialog(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type='submit' disabled={creatingDepartment}>
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
