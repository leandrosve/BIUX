import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { ROLES } from "src/constants/roles";
import { IsEmailUnique } from "src/users/validators/is-email-unique.validator";


export class RegisterUserDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Validate(IsEmailUnique)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;

  @ApiProperty()
  @IsOptional()
  @IsString()
  code:string
}