import { Module } from '@nestjs/common';
import { SegmentsEntity } from './entities/segments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SegmentsService } from './segments.service';
import { SegmentsController } from './segments.controller';


@Module({
  imports: [TypeOrmModule.forFeature([SegmentsEntity]), ],
  controllers: [SegmentsController],
  providers: [SegmentsService],
  exports:[TypeOrmModule]
})
export class SegmentsModule {}