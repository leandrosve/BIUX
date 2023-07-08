import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { ISegment } from "src/interfaces/segment.interface";

export class SegmentUpdateDTO implements ISegment{
  
  @ApiProperty()
  @IsInt()
  @IsOptional()
  id:number
  
  @ApiProperty()
  @IsInt()
  @Min(1)
  @IsOptional()
  order: number;

  @ApiProperty()
  @Optional()
  @IsInt()
  @Min(0)
  distance: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @IsOptional()
  cadence: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  pulseRate: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @IsOptional()
  duration: number;
  

  @IsString()@ApiProperty()
  @Optional()
  description: string;

}