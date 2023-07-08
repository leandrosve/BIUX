import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { RoutinesEntity } from 'src/routines/entities/routines.entity';
import { IsEmailUnique } from './validators/is-email-unique.validator';
import { UsersRepository } from './users.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity,RoutinesEntity]), ],

  controllers: [UsersController],
  providers: [UsersService,IsEmailUnique,UsersRepository],
  exports: [UsersService,TypeOrmModule,UsersRepository]
})
export class UsersModule {}
