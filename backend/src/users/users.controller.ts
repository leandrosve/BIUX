import { Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {

  @Get()
  users(){
    return 'all'
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number,){
    return 'all'
  }
}
