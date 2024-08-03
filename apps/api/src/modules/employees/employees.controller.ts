import { Controller, Get } from '@nestjs/common';
import { EmployeesService } from '~/modules/employees/employees.service';

@Controller('/employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  public async getAll() {
    return await this.employeesService.getAll();
  }
}
