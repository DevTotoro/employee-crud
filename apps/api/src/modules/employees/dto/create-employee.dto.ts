import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import type { Prisma } from '@repo/database';

export class CreateEmployeeDto implements Prisma.EmployeeCreateInput {
  @IsEmail()
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  email!: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  firstName!: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  lastName!: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.trim())
  departmentId?: string;
}
