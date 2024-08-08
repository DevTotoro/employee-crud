import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { DatabaseService } from '~/core/database.service';

@Injectable()
export class DepartmentsService {
  constructor(private readonly db: DatabaseService) {}

  public async getAll() {
    try {
      return await this.db.department.findMany();
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException();
    }
  }
}
