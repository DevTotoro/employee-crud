import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { Prisma } from '@repo/database';
import { DatabaseService } from '~/core/database.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly db: DatabaseService) {}

  public async getAll() {
    try {
      return await this.db.employee.findMany();
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException();
    }
  }

  public async createEmployee(data: CreateEmployeeDto) {
    try {
      return await this.db.employee.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Employee with this email already exists');
        }

        console.error(error);

        throw new InternalServerErrorException();
      }
    }
  }

  public async deleteEmployee(id: string) {
    try {
      return await this.db.employee.delete({ where: { id } });
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException();
    }
  }
}
