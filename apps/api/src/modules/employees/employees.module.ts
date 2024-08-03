import { Module } from '@nestjs/common';

import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

import { DatabaseService } from '~/core/database.service';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, DatabaseService]
})
export class EmployeesModule {}
