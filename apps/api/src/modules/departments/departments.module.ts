import { Module } from '@nestjs/common';

import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';

import { DatabaseService } from '~/core/database.service';

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService, DatabaseService],
  exports: [DepartmentsService]
})
export class DepartmentsModule {}
