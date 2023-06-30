import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { SegmentsService } from './segments.service';
import { Request } from 'express';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { SegmentCreateDTO } from './dto/segment.create.dto';


@ApiTags('Segments')
@Controller('segments')
@UseGuards(AuthGuard)
export class SegmentsController {
  constructor(private readonly segmentsService:SegmentsService){}

  @Get()
  @ApiHeader({name:"token",required:true})
  public async getSettingForUser(@Req() request: Request) {

    return await this.segmentsService.getSegment(request.idUser);
  }


  @Post()
  @PublicAccess()
  public async create(@Body() body:SegmentCreateDTO) {
    return await {body};
  }

}
