import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import { BaseEntity } from "../../config/base.entity";
import { IUser } from "../../interfaces/user.interface";
import { ROLES } from "../../constants/roles";
import { RoutinesEntity } from "../../routines/entities/routines.entity";
import { RoutineAssignmentEntity } from "../../users/entities/RoutineAssignmentEntity.entity";

@Entity({name:'users'})
export class UsersEntity extends BaseEntity implements IUser{
    
    @Column()
    first_name: string;
    
    @Column()
    last_name: string;

    
    @IsEmail()
    @IsNotEmpty()
    @Column({unique:true})
    email: string;

    @Column()
    password: string;

    @Column({type:'enum',enum:ROLES})
    role: ROLES;
    

    //a cada usuario de tipo Instructor le pertenece una rutina
    @OneToMany(() => RoutinesEntity, routine => routine.instructor)
    routines_created: RoutinesEntity[];
  
    // cada usuario con rol estudiante va a tener RoutineAssignmentEntity, esa asignasion le pertenece solo a un usuario
    @OneToMany(() => RoutineAssignmentEntity, assignment => assignment.student)
    routineAssignments: RoutineAssignmentEntity[];
}


