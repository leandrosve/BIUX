import { IsNotEmpty, IsOptional } from "class-validator";
import { BaseEntity } from "../../config/base.entity";
import { IRoutine } from "../../interfaces/routine.interface";
import { RoutineAssignmentEntity } from "../../users/entities/RoutineAssignmentEntity.entity";
import { UsersEntity } from "../../users/entities/users.entity";
import {  Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'routines' })
export class RoutinesEntity implements IRoutine{
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @CreateDateColumn({
    type:'timestamp',
    name:'created_at'
  })
  createdAt:Date;
  @UpdateDateColumn({
    type:'timestamp',
    name:'updated_at'
  })
  updatedAt:Date;


  @IsNotEmpty()
  @Column()
  name: string;

  @Column()
  @IsOptional()
  description: string;


  @ManyToOne(() => UsersEntity, user => user.routines_created)
  instructor: UsersEntity;

  
  @OneToMany(() => RoutineAssignmentEntity, assignment => assignment.routine)
  assignments: RoutineAssignmentEntity[];
}