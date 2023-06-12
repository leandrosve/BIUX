import { Column, Entity } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import { BaseEntity } from "../config/base.entity";
import { IUser } from "src/interfaces/user.interface";
import { ROLES } from "../constants/roles";

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
}


