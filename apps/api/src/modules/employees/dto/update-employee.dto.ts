import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import type { Prisma } from '@repo/database';

export class UpdateEmployeeParamsDto {
  @IsString()
  id!: string;
}

export class UpdatemployeeDto implements Prisma.EmployeeUpdateInput {
  @IsString()
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.trim())
  firstName?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.trim())
  lastName?: string;
}
