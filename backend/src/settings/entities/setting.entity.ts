import { BaseEntity } from 'src/config/base.entity';
import { ISetting } from 'src/interfaces/setting.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  

}
