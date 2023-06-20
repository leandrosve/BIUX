import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { UsersEntity } from '../entities/users.entity';
import { RoutinesEntity } from 'src/routines/entities/routines.entity';

export class StudentIntoRoutineDTO {
  @ApiProperty()
  @IsNotEmpty()
  student:UsersEntity

  @ApiProperty()
  @IsNotEmpty()
  routine:RoutinesEntity
}