import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ISetting } from "src/interfaces/setting.interface";
import { UsersEntity } from "src/users/entities/users.entity";

export class SettingCreateDTO implements ISetting{

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fontFamily: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fontSize: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  colorMode: string;

  @ApiProperty()
  @IsNotEmpty()
  user:UsersEntity
}