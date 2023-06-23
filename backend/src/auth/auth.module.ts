import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { SettingsService } from 'src/settings/settings.service';
import { SettingsModule } from 'src/settings/settings.module';


@Global()
@Module({
  imports: [UsersModule],
  providers: [AuthService, UsersService],
  controllers: [AuthController]
})
export class AuthModule {}
