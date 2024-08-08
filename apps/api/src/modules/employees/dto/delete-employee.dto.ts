import { IsString } from 'class-validator';

export class DeleteEmployeeDto {
  @IsString()
  id!: string;
}
