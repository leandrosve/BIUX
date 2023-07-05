import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/users.entity';
import { InstructorController } from './instructor.controller';
import { InstructorService } from './instructor.service';
import { InstructorCodeEntity } from './entities/instructorCode.entity';
import { InstructorStudentEntity } from './entities/InstructorStudent.entity';
import { RoutinesModule } from 'src/routines/routines.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, InstructorCodeEntity,InstructorStudentEntity]),RoutinesModule ],
  controllers: [InstructorController],
  providers: [InstructorService],
  exports:[InstructorService,TypeOrmModule]
})
export class InstructorModule {}
  