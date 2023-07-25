import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt } from 'class-validator';

export class UpdateStudentRoutinesDTO {
  @ApiProperty({ isArray: true, type: Number, example: [1, 2, 3] })
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  routineIds: number[];
}
