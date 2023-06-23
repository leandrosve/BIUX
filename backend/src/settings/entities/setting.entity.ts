import { BaseEntity } from '../../config/base.entity';
import { ISetting } from '../../interfaces/setting.interface';
import { UsersEntity } from '../../users/entities/users.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'settings'})
export class SettingEntity extends BaseEntity  implements ISetting{
  @Column({name:'font_family'})
  fontFamily: string;

  @Column({name:'font_size'})
  fontSize: string;

  @Column({name:'color'})
  color: string;

  @Column({name:'color_mode'})
  colorMode: string;

  @OneToOne(() => UsersEntity)
  @JoinColumn({name:'user_id'})
  user: UsersEntity

}
