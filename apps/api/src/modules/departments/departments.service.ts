import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { Prisma } from '@repo/database';
import { DatabaseService } from '~/core/database.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

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

  public async createDepartment(data: CreateDepartmentDto) {
    try {
      return await this.db.department.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Department with this name already exists');
        }
      }

      console.error(error);

      throw new InternalServerErrorException();
    }
  }
}
