import { Injectable } from '@nestjs/common';

import { DatabaseService } from '~/core/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly db: DatabaseService) {}

  public async getAll() {
    return await this.db.employee.findMany();
  }
}
