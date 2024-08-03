import { Module } from '@nestjs/common';

import { AppController } from '~/modules/app/app.controller';

import { EmployeesModule } from '~/modules/employees/employees.module';

@Module({
  imports: [EmployeesModule],
  controllers: [AppController]
})
export class AppModule {}
