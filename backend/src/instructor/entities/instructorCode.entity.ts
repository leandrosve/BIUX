import { BaseEntity } from '../../config/base.entity';
import { UsersEntity } from '../../users/entities/users.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({name:'instructor_code'})
export class InstructorCodeEntity extends BaseEntity  {
  @Column({name:'code',unique:true})
  code: string;

  @OneToOne(() => UsersEntity)
  @JoinColumn({name:'user_id'})
  user: UsersEntity

}
