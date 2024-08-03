import { Module } from '@nestjs/common';

import { EmployeesController } from '~/modules/employees/employees.controller';
import { EmployeesService } from '~/modules/employees/employees.service';

import { DatabaseService } from '~/core/database.service';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, DatabaseService]
})
export class EmployeesModule {}
