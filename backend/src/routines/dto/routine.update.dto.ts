import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { IRoutine } from 'src/interfaces/routine.interface';
import { SegmentCreateDTO } from 'src/segments/dto/segment.create.dto';
import { SegmentUpdateDTO } from 'src/segments/dto/segments.update.dto';

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

    @ApiProperty({ isArray: true,  type: SegmentUpdateDTO })
    @IsArray()
    @ArrayNotEmpty()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => SegmentUpdateDTO)
    segments: SegmentUpdateDTO[]

    @ApiProperty({ isArray: true, type: Number, example: [1, 2, 3] })
    @IsArray()
    @IsOptional()
    @IsInt({ each: true })
    @Type(() => Number)
    students: number[];
    
} 