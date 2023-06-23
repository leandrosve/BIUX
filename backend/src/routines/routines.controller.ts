import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiProperty, ApiTags } from '@nestjs/swagger';
import { RoutinesService } from './routines.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';


@ApiTags('Routines')
@Controller('routines')
@UseGuards(AuthGuard)
export class RoutinesController {
  constructor(private readonly routinesService:RoutinesService){}

  @Get()
  @ApiProperty()
  @ApiHeader({name:'token'})
  public async all(){
    return this.routinesService.all()
  }
}
