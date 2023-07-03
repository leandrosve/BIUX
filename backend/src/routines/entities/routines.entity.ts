import { IsNotEmpty, IsOptional } from "class-validator";
import { BaseEntity } from "../../config/base.entity";
import { IRoutine } from "../../interfaces/routine.interface";
import { RoutineAssignmentEntity } from "../../users/entities/RoutineAssignmentEntity.entity";
import { UsersEntity } from "../../users/entities/users.entity";
import {  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SegmentsEntity } from "../../segments/entities/segments.entity";

@Entity({ name: 'routines' })
export class RoutinesEntity extends BaseEntity implements IRoutine{

  @IsNotEmpty()
  @Column()
  name: string;

  @Column()
  description: string;


  @ManyToOne(() => UsersEntity, user => user.routines_created)
  @JoinColumn({name:'instructor_id'})
  instructor: UsersEntity;

  
  @OneToMany(() => RoutineAssignmentEntity, assignment => assignment.routine)
  assignments: RoutineAssignmentEntity[];


  @OneToMany(() => SegmentsEntity, (segment) => segment.routine, { cascade: true })
  segments: SegmentsEntity[]
}