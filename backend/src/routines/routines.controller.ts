import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiProperty, ApiTags } from '@nestjs/swagger';
import { RoutinesService } from './routines.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';


@ApiTags('Routines')
@Controller('routines')
@UseGuards(AuthGuard,RolesGuard)
export class RoutinesController {
  constructor(private readonly routinesService:RoutinesService){}

  @Get('student')
  @ApiProperty()
  @ApiHeader({name:'token',required: true})
  @Roles('STUDENT')
  public async student(@Req() request: Request){
    return this.routinesService.getStudentRoutines(request.idUser)
  }

}
