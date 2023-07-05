import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { InstructorService } from './instructor.service';
import { Request } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CodeCheckDTO } from './dto/code-check.dto';
import { RoutineUpdateDTO } from 'src/routines/dto/routine.update.dto';
import { RoutineCreateDTO } from 'src/routines/dto/routine.create.dto';

@ApiTags('Instructor')
@Controller('instructor')
@UseGuards(AuthGuard, RolesGuard)
export class InstructorController {

    constructor(private readonly instructorService:InstructorService){}

    @Get('/code')
    @ApiHeader({name:"token",required:true})
    @Roles('INSTRUCTOR')
    public async code(@Req() request: Request){
        return await this.instructorService.code(request.idUser);
    }

    @Post('/code/regenerate')
    @ApiHeader({name:"token",required:true})
    @Roles('INSTRUCTOR')
    public async regenerateCode(@Req() request: Request){
        return await this.instructorService.regenerateCode(request.idUser);
    }
    
    @Post('/code/check')
    @PublicAccess()
    public async checkCode(@Body() body:CodeCheckDTO){
        return await this.instructorService.checkCode(body.code);
    }

    @Post('/routines')
    @ApiProperty()
    @ApiHeader({name:'token',required: true})
    @Roles('INSTRUCTOR')
    public async created(@Req() request: Request, @Body() body:RoutineCreateDTO){
      return await this.instructorService.createRoutine(request.idUser,body)
    }
    
    @Get('/routines')
    @ApiHeader({name:"token",required:true})
    @Roles('INSTRUCTOR')
    public async routines(@Req() request: Request){
        return await this.instructorService.routines(request.idUser);
    }
    @Get('/routine/:id_routine')
    @ApiHeader({name:"token",required:true})
    @Roles('INSTRUCTOR')
    public async routine(@Req() request: Request,@Param('id_routine') id_routine: number){
        return await this.instructorService.routineDetails(request.idUser,id_routine);
    }

    @Patch('/routines/:id_routine')
    @ApiProperty({name:'id_routine'})
    @ApiHeader({name:'token',required: true})
    @Roles('INSTRUCTOR')
    public async updateRoutine(@Req() request: Request,@Param('id_routine') id_routine: number,@Body() body:RoutineUpdateDTO){
      return await this.instructorService.updateRoutine(request.idUser,id_routine,body)
    }
    @Get('/students')
    @ApiProperty()
    @ApiHeader({name:'token',required: true})
    @Roles('INSTRUCTOR')
    public async students(@Req() request: Request){
        return await 'students'
    }

}
