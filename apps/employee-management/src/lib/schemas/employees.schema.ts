import { z } from 'zod';

export type CreateEmployeeSchema = z.infer<typeof createEmployeeSchema>;
export const createEmployeeSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50)
});

export type EditEmployeeSchema = z.infer<typeof editEmployeeSchema>;
export const editEmployeeSchema = z.object({
  firstName: createEmployeeSchema.shape.firstName,
  lastName: createEmployeeSchema.shape.lastName
});
