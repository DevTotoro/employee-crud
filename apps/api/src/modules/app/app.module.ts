import { Module } from '@nestjs/common';

import { AppController } from '~/modules/app/app.controller';

import { EmployeesModule } from '~/modules/employees/employees.module';
import { DepartmentsModule } from '~/modules/departments/departments.module';

@Module({
  imports: [EmployeesModule, DepartmentsModule],
  controllers: [AppController]
})
export class AppModule {}
