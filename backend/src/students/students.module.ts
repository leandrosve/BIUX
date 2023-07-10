import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/users.entity';
import { InstructorStudentEntity } from 'src/instructor/entities/instructorStudent.entity';
import { UsersModule } from 'src/users/users.module';
import { InstructorStudentRepository } from 'src/instructor/repository/instructorStudent.repository';
import { RoutineInstructorStudentEntity } from 'src/instructor/entities/routines-instructor-students.entity';
import { RoutinesEntity } from 'src/routines/entities/routines.entity';
import { RoutineRepository } from 'src/routines/routines.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, RoutineInstructorStudentEntity, RoutinesEntity, InstructorStudentEntity]), UsersModule],
  controllers: [StudentsController],
  providers: [StudentsService, InstructorStudentRepository, RoutineRepository],
})
export class StudentsModule {}
