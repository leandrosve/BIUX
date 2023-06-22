import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Setting')
@Controller('setting')
export class SettingController {
  
  @Get('user/:id')
  public async findUserById(@Param('id') id: number) {
    return "setting";
  }
}
