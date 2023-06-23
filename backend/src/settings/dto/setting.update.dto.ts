import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ISetting } from "src/interfaces/setting.interface";
import { UsersEntity } from "src/users/entities/users.entity";

export class SettingUpdateDTO implements ISetting{

  @ApiProperty()
  @IsOptional()
  @IsString()
  fontFamily: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  fontSize: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  color: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  colorMode: string;


}