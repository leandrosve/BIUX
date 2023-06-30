import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiProperty, ApiTags } from '@nestjs/swagger';
import { RoutinesService } from './routines.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RoutineCreateDTO } from './dto/routine.create.dto';


@ApiTags('Routines')
@Controller('routines')
@UseGuards(AuthGuard,RolesGuard)
export class RoutinesController {
  constructor(private readonly routinesService:RoutinesService){}

  
  @Get('instructor')
  @ApiProperty()
  @ApiHeader({name:'token',required: true})
  @Roles('INSTRUCTOR')
  public async all(@Req() request: Request){
    return this.routinesService.all()
  }

  @Post('instructor')
  @ApiProperty()
  @ApiHeader({name:'token',required: true})
  @Roles('INSTRUCTOR')
  public async created(@Req() request: Request, @Body() body:RoutineCreateDTO){
    return this.routinesService.createdRoutine(request.idUser,body)
  }

  @Patch('instructor/:id_routine')
  @ApiProperty({name:'id_routine'})
  @ApiHeader({name:'token',required: true})
  @Roles('INSTRUCTOR')
  public async uptated(@Req() request: Request,@Param('id_routine') id_routine: number){
    return this.routinesService.all()
  }

  // @Get('instructor/assignsToStudent/:id_student')
  // @ApiProperty({name:"id_student"})
  // @ApiHeader({name:'token',required: true})
  // @Roles('STUDENT')
  // public async asignarToStudent(@Req() request: Request,@Param('id_student') id_student: number){
  //   return this.routinesService.getStudentRoutines(request.idUser)
  // }

//----------------------------------------------------------
  @Get('student')
  @ApiProperty()
  @ApiHeader({name:'token',required: true})
  @Roles('STUDENT')
  public async student(@Req() request: Request){
    return this.routinesService.getStudentRoutines(request.idUser)
  }


}
