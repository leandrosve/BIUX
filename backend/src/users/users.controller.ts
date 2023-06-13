import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDTO } from './dto/user.dto';
import { UserUpdateDTO } from './dto/user.update.dto';
import { StudentIntoRoutineDTO } from './dto/studentIntoRoutine.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService:UsersService){}

  @Get()
  public async users(){
    return await this.usersService.findUsers();
  }

  @ApiParam({
    name: 'id',
  })
  @Patch(':id')
  public async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UserUpdateDTO,
  ) {
    return await this.usersService.updateUser(body, id);
  }

  @Get(':id')
  public async findUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findUsersBy(id);
  }
  @Delete(':id')
  public async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.deleteUser(id);
  }
  
  @Post('studentIntoRoutine')
  public async addStudentIntoRoutine(@Body() body :StudentIntoRoutineDTO){
    console.log(body)
    return 200
  }
}
