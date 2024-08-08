import { z } from 'zod';

export type CreateEmployeeSchema = z.infer<typeof createEmployeeSchema>;
export const createEmployeeSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50)
});
