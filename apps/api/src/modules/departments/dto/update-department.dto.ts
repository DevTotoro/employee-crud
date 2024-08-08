import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import type { Prisma } from '@repo/database';

export class UpdateDepartmentParamsDto {
  @IsString()
  id!: string;
}

export class UpdateDepartmentDto implements Prisma.DepartmentUpdateInput {
  @IsString()
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.trim())
  name?: string;
}
