import { Body, Controller, Get, Post } from '@nestjs/common';

import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Controller('/departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  public async getAll() {
    return await this.departmentsService.getAll();
  }

  @Post()
  public async createDepartment(@Body() body: CreateDepartmentDto) {
    return await this.departmentsService.createDepartment(body);
  }
}
