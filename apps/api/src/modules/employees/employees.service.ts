import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { Prisma } from '@repo/database';
import { DatabaseService } from '~/core/database.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

import { DepartmentsService } from '~/modules/departments/departments.service';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly db: DatabaseService,
    private readonly departmentsService: DepartmentsService
  ) {}

  public async getAll() {
    try {
      return await this.db.employee.findMany({
        include: { department: true }
      });
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException();
    }
  }

  public async createEmployee(data: CreateEmployeeDto) {
    if (data.departmentId) {
      const department = await this.departmentsService.getById(data.departmentId);

      if (!department) {
        throw new NotFoundException('Department not found');
      }
    }

    try {
      return await this.db.employee.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Employee with this email already exists');
        }
      }

      console.error(error);

      throw new InternalServerErrorException();
    }
  }

  public async updateEmployee(id: string, data: UpdateEmployeeDto) {
    if (data.departmentId) {
      const department = await this.departmentsService.getById(data.departmentId);

      if (!department) {
        throw new NotFoundException('Department not found');
      }
    }

    try {
      return await this.db.employee.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2001') {
          throw new NotFoundException('Employee not found');
        }
      }

      console.error(error);

      throw new InternalServerErrorException();
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
