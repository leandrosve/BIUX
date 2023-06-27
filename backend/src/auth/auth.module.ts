import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { SettingsModule } from 'src/settings/settings.module';
import { InstructorModule } from 'src/instructor/instructor.module';
import { APP_FILTER } from '@nestjs/core';
import { ErrorManagerFilter } from 'src/utils/error.manager';


@Global()
@Module({
  imports: [UsersModule,SettingsModule, InstructorModule],
  providers: [AuthService, UsersService,
    {
      provide: APP_FILTER,
      useClass: ErrorManagerFilter,
    },
  ],
  controllers: [AuthController]
})
export class AuthModule {}
