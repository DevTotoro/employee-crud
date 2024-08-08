import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto, UpdateDepartmentParamsDto } from './dto/update-department.dto';
import { DeleteDepartmentDto } from './dto/delete-department.dto';

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

  @Put('/:id')
  public async updateEmployee(@Param() { id }: UpdateDepartmentParamsDto, @Body() body: UpdateDepartmentDto) {
    return await this.departmentsService.updateDepartment(id, body);
  }

  @Delete('/:id')
  public async deleteEmployee(@Param() { id }: DeleteDepartmentDto) {
    return await this.departmentsService.deleteDepartment(id);
  }
}
