import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { RoutineAssignmentEntity } from './entities/RoutineAssignmentEntity.entity';
import { RoutinesEntity } from 'src/routines/entities/routines.entity';
import { IsEmailUnique } from './validators/is-email-unique.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity,RoutineAssignmentEntity,RoutinesEntity]), ],

  controllers: [UsersController],
  providers: [UsersService,IsEmailUnique],
  exports: [UsersService,TypeOrmModule]
})
export class UsersModule {}
