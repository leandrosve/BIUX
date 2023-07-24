import { Module } from '@nestjs/common';
import { RoutinesController } from './routines.controller';
import { RoutinesService } from './routines.service';
import { RoutinesEntity } from './entities/routines.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SegmentsModule } from 'src/segments/segments.module';
import { RoutineRepository } from './routines.repository';
import { RoutineInstructorStudentRepository } from 'src/instructor/repository/routinesInstructorsStudents.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoutinesEntity]), SegmentsModule],
  controllers: [RoutinesController],
  providers: [RoutinesService, RoutineRepository,RoutineInstructorStudentRepository],
  exports:[TypeOrmModule,RoutinesService]
})
export class RoutinesModule {}
