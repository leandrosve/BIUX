import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';
import { SettingsService } from './settings.service';
import { SettingUpdateDTO } from './dto/setting.update.dto';
import { PublicAccess } from 'src/auth/decorators/public.decorator';


@ApiTags('Settings')
@Controller('settings')
@UseGuards(AuthGuard)
export class SettingsController {
  constructor(private readonly settingService:SettingsService){}

  @Get('user')
  @ApiHeader({name:"token",required:true})
  public async getSettingForUser(@Req() request: Request) {

    return await this.settingService.getSetting(request.idUser);
  }


  @Patch('user')
  @ApiHeader({name:"token",required:true})
  @ApiProperty()
  public async update(@Req() request: Request, @Body() body: SettingUpdateDTO,) {

    return await this.settingService.update(request.idUser,body);
  }

  @ApiParam({
    name: 'id_user',
  })
  @PublicAccess()
  @Get('findAllBy/:id_user')
  public async allBy(@Param('id_user') id_user: number){
    return await this.settingService.findBy(id_user);
  }

  @PublicAccess()
  @Get()
  public async all(){
    return await this.settingService.findAll();
  }

}
