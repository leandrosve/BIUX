import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "../../users/entities/users.entity";
import { RoutinesEntity } from "../../routines/entities/routines.entity";
import { BaseEntity } from '../../config/base.entity';


@Entity({name:'rutines_assignment'})
export class RoutineAssignmentEntity extends BaseEntity {


  //una rutina puede ser asignado muchas veces
  @ManyToOne(() => RoutinesEntity, routine => routine.assignments)
  @JoinColumn({ name: 'routine_id', referencedColumnName: 'id' })
  routine: RoutinesEntity;

  //a un estudiante se le puede asignar muchas rutinas
  @ManyToOne(() => UsersEntity, user => user.routineAssignments)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  student: UsersEntity;
}
