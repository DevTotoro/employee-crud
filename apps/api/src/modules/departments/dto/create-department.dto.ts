import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import type { Prisma } from '@repo/database';

export class CreateDepartmentDto implements Prisma.DepartmentCreateInput {
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  name!: string;
}
