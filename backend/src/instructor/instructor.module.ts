import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/users.entity';
import { InstructorController } from './instructor.controller';
import { InstructorService } from './instructor.service';
import { InstructorCodeEntity } from './entities/instructorCode.entity';
import { InstructorStudentEntity } from './entities/instructorStudent.entity';
import { RoutinesModule } from 'src/routines/routines.module';
import { UsersModule } from 'src/users/users.module';
import { InstructorStudentRepository } from './repository/instructorStudent.repository';
import { RoutineInstructorStudentEntity } from './entities/routines-instructor-students.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, InstructorCodeEntity,InstructorStudentEntity,RoutineInstructorStudentEntity]),RoutinesModule,UsersModule],
  controllers: [InstructorController],
  providers: [InstructorService,InstructorStudentRepository],
  exports:[InstructorService,TypeOrmModule]
})
export class InstructorModule {}
  