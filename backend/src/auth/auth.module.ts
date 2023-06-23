import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { SettingsModule } from 'src/settings/settings.module';


@Global()
@Module({
  imports: [UsersModule,SettingsModule],
  providers: [AuthService, UsersService],
  controllers: [AuthController]
})
export class AuthModule {}
