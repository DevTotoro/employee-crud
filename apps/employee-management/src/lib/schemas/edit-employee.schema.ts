import { z } from 'zod';

export type EditEmployeeSchema = z.infer<typeof editEmployeeSchema>;
export const editEmployeeSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50)
});
