import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import type { Department, Employee } from '@repo/database';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import {
  createEmployeeSchema,
  type CreateEmployeeSchema,
  type EditEmployeeSchema
} from '~/lib/schemas/employees.schema';
import { EmployeeTable } from '~/components/employee-table';
import { apiFetch } from '~/lib/api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [createEmployeeDialog, setCreateEmployeeDialog] = useState(false);
  const [creatingEmployee, setCreatingEmployee] = useState(false);
  const [updatingEmployee, setUpdatingEmployee] = useState(false);
  const [deletingEmployee, setDeletingEmployee] = useState(false);

  const reactHookForm = useForm<CreateEmployeeSchema>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      departmentId: undefined
    }
  });

  useEffect(() => {
    void getDepartments();
    void getEmployees();
  }, []);

  const getEmployees = async () => {
    const res = await apiFetch<Employee[]>('/employees');

    if (!res.success) {
      toast.error('An error occured while fetching employees');
    } else {
      setEmployees(res.data);
    }
  };

  const getDepartments = async () => {
    const res = await apiFetch<Department[]>('/departments');

    if (!res.success) {
      toast.error('An error occured while fetching departments');
    } else {
      setDepartments(res.data);
    }
  };

  const createEmployee = async (values: CreateEmployeeSchema) => {
    setCreatingEmployee(true);

    const res = await apiFetch<never>('/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });

    setCreatingEmployee(false);

    if (!res.success) {
      toast.error('An error occured while creating the employee');
    } else {
      await getEmployees();
    }
  };

  const updateEmployee = async (employeeId: string, values: EditEmployeeSchema) => {
    setUpdatingEmployee(true);

    const res = await apiFetch<never>(`/employees/${employeeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });

    setUpdatingEmployee(false);

    if (!res.success) {
      toast.error('An error occured while updating the employee');
    } else {
      await getEmployees();
    }
  };

  const deleteEmployee = async (employeeId: string) => {
    setDeletingEmployee(true);

    const res = await apiFetch<never>(`/employees/${employeeId}`, { method: 'DELETE' });

    setDeletingEmployee(false);

    if (!res.success) {
      toast.error('An error occured while deleting the employee');
    } else {
      await getEmployees();
    }
  };

  return (
    <>
      <div className='flex flex-col w-full gap-8'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl font-bold'>Employees</h1>

          <Button
            className='w-fit'
            onClick={() => {
              setCreateEmployeeDialog(true);
            }}
          >
            Create employee
          </Button>
        </div>

        <EmployeeTable
          employees={employees}
          departments={departments}
          isUpdating={updatingEmployee}
          isDeleting={deletingEmployee}
          onUpdate={updateEmployee}
          onDelete={deleteEmployee}
        />
      </div>

      <Dialog
        open={createEmployeeDialog}
        onOpenChange={(open) => {
          if (!open) {
            setCreateEmployeeDialog(false);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create employee</DialogTitle>
          </DialogHeader>

          <Form {...reactHookForm}>
            <form
              onSubmit={(...args) =>
                void reactHookForm.handleSubmit(async (values) => {
                  await createEmployee(values);

                  setCreateEmployeeDialog(false);
                })(...args)
              }
              className='space-y-8'
            >
              <FormField
                control={reactHookForm.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={creatingEmployee} placeholder='e.g. john_doe@example.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={reactHookForm.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input disabled={creatingEmployee} placeholder='e.g. John' {...field} />
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
                      <Input disabled={creatingEmployee} placeholder='e.g. Doe' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={reactHookForm.control}
                name='departmentId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select department' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments.map((department) => (
                          <SelectItem key={department.id} value={department.id}>
                            {department.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  variant='outline'
                  type='button'
                  disabled={creatingEmployee}
                  onClick={() => {
                    setCreateEmployeeDialog(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type='submit' disabled={creatingEmployee}>
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
