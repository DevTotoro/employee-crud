import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { DeleteEmployeeDto } from './dto/delete-employee.dto';

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

  @Delete('/:id')
  public async deleteEmployee(@Param() { id }: DeleteEmployeeDto) {
    return await this.employeesService.deleteEmployee(id);
  }
}
