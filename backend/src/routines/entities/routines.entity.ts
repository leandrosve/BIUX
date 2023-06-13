import { IsNotEmpty } from "class-validator";
import { BaseEntity } from "../../config/base.entity";
import { IRoutine } from "../../interfaces/routine.interface";
import { RoutineAssignmentEntity } from "../../users/entities/RoutineAssignmentEntity.entity";
import { UsersEntity } from "../../users/entities/users.entity";
import {  Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: 'routines' })
export class RoutinesEntity extends BaseEntity implements IRoutine{

  @IsNotEmpty()
  @Column()
  name: string;

  @Column()
  description: string;


  @ManyToOne(() => UsersEntity, user => user.routines_created)
  instructor: UsersEntity;

  
  @OneToMany(() => RoutineAssignmentEntity, assignment => assignment.routine)
  assignments: RoutineAssignmentEntity[];
}