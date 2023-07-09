import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/users.entity';
import { InstructorStudentEntity } from 'src/instructor/entities/instructorStudent.entity';
import { UsersModule } from 'src/users/users.module';
import { InstructorStudentRepository } from 'src/instructor/repository/instructorStudent.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, InstructorStudentEntity]), UsersModule],
  controllers: [StudentsController],
  providers: [StudentsService, InstructorStudentRepository],
})
export class StudentsModule {}
