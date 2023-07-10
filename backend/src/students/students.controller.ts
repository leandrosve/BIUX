import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { Request } from 'express';

@ApiTags('Students')
@Controller('students')
@UseGuards(AuthGuard, RolesGuard)
@Roles('STUDENT')
@ApiHeader({ name: 'token', required: true })
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('/me')
  @Roles('STUDENT')
  public async me(@Req() request: Request) {
    return await this.studentsService.getDetails(request.idUser);
  }

  @Get('/routines')
  @Roles('STUDENT')
  public async getRoutines(@Req() request: Request) {
    return await this.studentsService.getRoutinesV2(request.idUser);
  }
}
