import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';


@ApiTags('Settings')
@Controller('settings')
@UseGuards(AuthGuard)
export class SettingsController {

  @Get('user')
  @ApiHeader({name:"token"})
  public async getSettingForUser() {
    return "setting";
  }

}
