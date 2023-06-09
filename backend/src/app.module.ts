import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [],
    //   useFactory: () => ({
    //     type: 'postgres',
    //     host: 'localhost',
    //     port: 5432,
    //     username: 'root',
    //     password: 'root',
    //     database: 'db_biux',
    //     entities: [
    //       __dirname + '/**/*.entity{.ts,.js}',
    //     ],
    //     synchronize: true,
    //   })
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: '1234',
      database: 'db_biux',
      entities: [ __dirname + '/**/*.entity{.ts,.js}',],
      synchronize: true,
    }),
    UsersModule,
    ConfigModule.forRoot(),
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
