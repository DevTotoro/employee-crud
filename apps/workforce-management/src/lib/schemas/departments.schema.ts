import { z } from 'zod';

export type CreateDepartmentSchema = z.infer<typeof createDepartmentSchema>;
export const createDepartmentSchema = z.object({
  name: z.string().min(2).max(50)
});

export type EditDepartmentSchema = z.infer<typeof editDepartmentSchema>;
export const editDepartmentSchema = z.object({
  name: createDepartmentSchema.shape.name
});
