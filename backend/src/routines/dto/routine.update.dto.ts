import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { IRoutine } from 'src/interfaces/routine.interface';
import { SegmentCreateDTO } from 'src/segments/dto/segment.create.dto';

export class RoutineUpdateDTO implements IRoutine{

    @ApiProperty({ example: 'Nombre de la rutina'})
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Descripcion de la rutina'})
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ isArray: true,  type: SegmentCreateDTO })
    @IsArray()
    @ArrayNotEmpty()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => SegmentCreateDTO)
    segments: SegmentCreateDTO[]
    
} 