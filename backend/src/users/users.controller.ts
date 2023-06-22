import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDTO } from './dto/user.dto';
import { UserUpdateDTO } from './dto/user.update.dto';
import { StudentIntoRoutineDTO } from './dto/studentIntoRoutine.dto';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService:UsersService){}

  @PublicAccess()
  @Get()
  public async users(){
    return await this.usersService.findUsers();
  }

  @ApiParam({
    name: 'id',
  })
  @ApiHeader({name:'token'})
  @Patch(':id')
  public async updateUser(
    @Param('id') id: number,
    @Body() body: UserUpdateDTO,
  ) {
    return await this.usersService.updateUser(body, id);
  }

  @ApiParam({
    name: 'id',
  })
  @ApiHeader({name:'token'})
  @Get(':id')
  public async findUserById(@Param('id') id: number) {
    return await this.usersService.findUserById(id);
  }

  
  @Post('studentIntoRoutine')
  public async addStudentIntoRoutine(@Body() body :StudentIntoRoutineDTO){
    console.log(body)
    return 200
  }
}
