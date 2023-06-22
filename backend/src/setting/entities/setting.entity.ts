import { BaseEntity } from 'src/config/base.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'setting'})
export class SettingEntity extends BaseEntity {

}
