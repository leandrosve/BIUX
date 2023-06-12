import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoutinesService } from './routines.service';
@ApiTags('Routines')
@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService:RoutinesService){}

  @Get()
  public async all(){
    return this.routinesService.all()
  }
}
