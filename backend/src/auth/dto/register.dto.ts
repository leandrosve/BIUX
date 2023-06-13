import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, Validate } from "class-validator";
import { ROLES } from "src/constants/roles";
import { IsEmailUnique } from "src/users/validators/is-email-unique.validator";


export class RegisterUserDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name: string;

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
}