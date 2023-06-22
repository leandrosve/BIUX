import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor() {}

  @Get('/check')
  async checkStatus() {
    return { status: 'online' };
  }
}
