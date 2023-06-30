import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString, Min } from "class-validator";
import { ISegment } from "src/interfaces/segment.interface";

export class SegmentCreateDTO implements ISegment{

  @ApiProperty()
  @Optional()
  @IsInt()
  @Min(0)
  distance: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  cadence: number;

  @ApiProperty()
  @IsNumber()
  pulseRate: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  duration: number;
  

  @IsString()@ApiProperty()
  @Optional()
  description: string;


}