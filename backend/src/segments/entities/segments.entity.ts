import { ISegment } from 'src/interfaces/segment.interface';
import { BaseEntity } from '../../config/base.entity';
import { ISetting } from '../../interfaces/setting.interface';
import { UsersEntity } from '../../users/entities/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { RoutinesEntity } from '../../routines/entities/routines.entity';

@Entity({name:'segments'})
export class SegmentsEntity extends BaseEntity  implements ISegment{
  @Column({name:'order'})
  order:number

  @Column({name:'distance'})
  distance: number;

  @Column({name:'cadence'})
  cadence: number;

  @Column({name:'pulse_rate'})
  pulseRate: number;

  @Column({name:'duration'})
  duration: number;

  @Column({name:'description'})
  description: string;

  @ManyToOne(() => RoutinesEntity, (routine) => routine.segments)
  @JoinColumn({ name: 'routine_id', referencedColumnName: 'id' })
  routine: RoutinesEntity

}
