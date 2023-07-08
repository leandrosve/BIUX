import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ROLES } from "src/constants/roles";

export class UserReducedDTO{
  id:number

  email: string;


  role: ROLES;
}