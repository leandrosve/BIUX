import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { InstructorService } from './instructor.service';
import { Request } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CodeCheckDTO } from './dto/code-check.dto';

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
}
