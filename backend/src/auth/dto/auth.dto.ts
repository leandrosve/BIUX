import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class LoginAuthDto{
  @ApiProperty()
  @IsNotEmpty()
  email:string

  @ApiProperty()
  @IsNotEmpty()
  password:string
}