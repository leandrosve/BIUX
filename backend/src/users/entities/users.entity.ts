import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import { BaseEntity } from "../../config/base.entity";
import { IUser } from "../../interfaces/user.interface";
import { ROLES } from "../../constants/roles";
import { RoutinesEntity } from "../../routines/entities/routines.entity";
import { Exclude } from "class-transformer";

@Entity({name:'users'})
export class UsersEntity extends BaseEntity  implements IUser{
    
    @Column({name:'first_name'})
    firstName: string;
    
    @Column({name:'last_name'})
    lastName: string;

    
    @IsEmail()
    @IsNotEmpty()
    @Column({unique:true})
    email: string;

    @Exclude()
    @Column({ select: false })
    password: string;

    @Column({type:'enum',enum:ROLES})
    role: ROLES;
    

    //a cada usuario de tipo Instructor le pertenece una rutina
    @OneToMany(() => RoutinesEntity, routine => routine.instructor)
    routines_created: RoutinesEntity[];
  


        // Relación uno a muchos: un instructor tiene muchos estudiantes
    @OneToMany(() => UsersEntity, student => student)
    students: UsersEntity[];


}


