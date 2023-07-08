import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { IRoutine } from "src/interfaces/routine.interface";
import { SegmentCreateDTO } from 'src/segments/dto/segment.create.dto';

export class RoutineCreateDTO implements IRoutine{
    @ApiProperty({ example: 'Nombre de la rutina'})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'Descripcion de la rutina'})
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ isArray: true,  type: SegmentCreateDTO })
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => SegmentCreateDTO)
    segments: SegmentCreateDTO[]


    //@Validate(IsStudents)
    @ApiProperty({ isArray: true, type: Number, example: [1, 2, 3] })
    @IsArray()
    @IsOptional()
    @IsInt({ each: true })
    @Type(() => Number)
    students: number[];
    

} 