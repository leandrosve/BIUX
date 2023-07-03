import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { ISegment } from "src/interfaces/segment.interface";

export class SegmentCreateDTO implements ISegment{
  @ApiProperty()
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  order: number;

  @ApiProperty()
  @Optional()
  @IsInt()
  @Min(0)
  distance: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  cadence: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  pulseRate: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  duration: number;
  

  @IsString()@ApiProperty()
  @Optional()
  description: string;



}
export class SegmentUpdateDTO implements ISegment{
  @IsInt()
  @IsOptional()
  id:number
  
  @ApiProperty()
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  order: number;

  @ApiProperty()
  @Optional()
  @IsInt()
  @Min(0)
  distance: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  cadence: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  pulseRate: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  duration: number;
  

  @IsString()@ApiProperty()
  @Optional()
  description: string;



}