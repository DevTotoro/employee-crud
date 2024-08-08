import { IsString } from 'class-validator';

export class DeleteDepartmentDto {
  @IsString()
  id!: string;
}
