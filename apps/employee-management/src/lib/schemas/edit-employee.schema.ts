import { z } from 'zod';

import { createEmployeeSchema } from './create-employee.schema';

export type EditEmployeeSchema = z.infer<typeof editEmployeeSchema>;
export const editEmployeeSchema = z.object({
  firstName: createEmployeeSchema.shape.firstName,
  lastName: createEmployeeSchema.shape.lastName
});
