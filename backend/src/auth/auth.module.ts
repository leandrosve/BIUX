import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';


@Global()
@Module({
  imports: [UsersModule],

  controllers: [AuthController],
  providers: [AuthService,UsersService]
})
export class AuthModule {}
