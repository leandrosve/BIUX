import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    last_name: string;

    @Column({unique:true})
    @IsEmail()
    email: string;

    @Column()
    password: string;
}


