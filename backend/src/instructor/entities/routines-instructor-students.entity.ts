import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from '../../config/base.entity';
import { UsersEntity } from "../../users/entities/users.entity";
import { RoutinesEntity } from "../../routines/entities/routines.entity";


@Entity({name:'routines_instructors_students'})
export class RoutineInstructorStudentEntity extends BaseEntity {


  //una rutina puede ser asignado muchas veces
  @ManyToOne(() => RoutinesEntity)
  @JoinColumn({ name: 'routine_id', referencedColumnName: 'id' })
  routine: RoutinesEntity;

  //a un estudiante se le puede asignar muchas rutinas
  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  student: UsersEntity;
  
  //a un estudiante se le puede asignar muchas rutinas
  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'instructor_id', referencedColumnName: 'id' })
  instructor: UsersEntity;
}
