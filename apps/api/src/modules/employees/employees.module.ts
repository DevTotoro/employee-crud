import { Module } from '@nestjs/common';

import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

import { DatabaseService } from '~/core/database.service';
import { DepartmentsService } from '~/modules/departments/departments.service';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, DatabaseService, DepartmentsService]
})
export class EmployeesModule {}
