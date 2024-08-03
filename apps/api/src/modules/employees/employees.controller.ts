import { Body, Controller, Get, Post } from '@nestjs/common';

import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller('/employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  public async getAll() {
    return await this.employeesService.getAll();
  }

  @Post()
  public async createEmployee(@Body() body: CreateEmployeeDto) {
    return await this.employeesService.createEmployee(body);
  }
}
