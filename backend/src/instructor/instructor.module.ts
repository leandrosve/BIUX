import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/users.entity';
import { InstructorController } from './instructor.controller';
import { InstructorService } from './instructor.service';
import { InstructorCodeEntity } from './entities/instructorCode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, InstructorCodeEntity]), ],
  controllers: [InstructorController],
  providers: [InstructorService],
  exports:[InstructorService,TypeOrmModule]
})
export class InstructorModule {}
  