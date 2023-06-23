import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SettingEntity } from './entities/setting.entity';


@Injectable()
export class SettingsService {
      constructor(
        @InjectRepository(SettingEntity)
        private readonly userRepository: Repository<SettingEntity>,
        ){}
}
