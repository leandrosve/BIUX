import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DataSourceConfig } from './config/data.source';
import { RoutinesModule } from './routines/routines.module';
import { SegmentsModule } from './segments/segments.module';
import { SettingsModule } from './settings/settings.module';
import 'dotenv/config'


@Module({
  imports: [ 
    ConfigModule.forRoot(
      {
        envFilePath: `.${process.env.NODE_ENV}.env`,
        isGlobal:true
      }
      ),
    TypeOrmModule.forRoot({
      ...DataSourceConfig
    }),
    UsersModule,
    AuthModule,
    RoutinesModule,
    SegmentsModule,
    SettingsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
