import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingEntity } from './entities/setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SettingEntity]), ],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports:[SettingsModule]
})
export class SettingsModule {}
