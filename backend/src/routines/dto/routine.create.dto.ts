import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IRoutine } from "src/interfaces/routine.interface";

export class RoutineCreateDTO implements IRoutine{
    @ApiProperty({ example: 'Nombre de la rutina'})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'Descripcion de la rutina'})
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description: string;
    
} 