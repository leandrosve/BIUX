import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDTO } from './dto/user.dto';
import { UserUpdateDTO } from './dto/user.update.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService:UsersService){}

  @Get()
  public async users(){
    return await this.usersService.findUsers();
  }

  @Post('register')
  public async registerUser(@Body() body:UserDTO){
    return await this.usersService.createdUser(body)
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
}
