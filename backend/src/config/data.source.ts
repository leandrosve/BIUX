import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import 'dotenv/config'
import { UsersEntity } from "src/users/entities/users.entity";


ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV}.env`,

}); 

export const DataSourceConfig:DataSourceOptions={
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username:process.env.DB_USER,
  password: String(process.env.DB_PASSWORD) || '',
  database: process.env.DB_DATABASE,
  entities: [UsersEntity,__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  migrationsTableName: 'migrations',

}

export const AppDS= new DataSource(DataSourceConfig)
AppDS.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })