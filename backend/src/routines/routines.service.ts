import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { RoutinesEntity } from './entities/routines.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { RoutineCreateDTO } from './dto/routine.create.dto';
import { UsersEntity } from 'src/users/entities/users.entity';
import { ErrorManager } from 'src/utils/error.manager';
import { RoutineUpdateDTO } from './dto/routine.update.dto';
import { SegmentCreateDTO } from 'src/segments/dto/segment.create.dto';
import { RoutineReducedDTO } from './dto/routine.reduced.dto';
import { RoutineRepository } from './routines.repository';

@Injectable()
export class RoutinesService {
  constructor(
 
    private readonly routineRepository: RoutineRepository,
    private readonly userService: UsersService
  ) {}

  public async routinesByInstructor(instructorId: number) {
    return this.routineRepository.getReducedRoutinesForInstructor(instructorId);
  }

  public async getStudentRoutines(routineId: number) {
    return 'student routines: ';
  }
  public async createdRoutine(userId: number, body: RoutineCreateDTO) {
    const user = await this.userService.findUserById(userId);

    this.checkSegmentsOrder(body.segments);

    const newRoutine = {
      ...body,
      instructor: user,
    };
    const result = await this.routineRepository.save(newRoutine);
    //console.log(user)
    return result;
  }
  public async details(userId: number, routineId: number) {
    const result = await this.routineRepository
      .createQueryBuilder('routines')
      .leftJoinAndSelect('routines.segments', 'segments')
      .where('routines.id = :routineId and routines.instructor_id = :userId', { routineId, userId })
      .getOne();

    if (result) {
      return await result;
    }
    throw new ErrorManager({
      type: 'NOT_FOUND',
      message: 'No se encontro la rutina',
    });
  }

  public async update(userId: number, routineId: number, body: RoutineUpdateDTO) {
    const routine = await this.details(userId, routineId);
    this.checkSegmentsOrder(body.segments);
    const resultUpdated = await this.routineRepository.save({ routine, ...body });

    if (!resultUpdated) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'No se pudo realizar la actualizacion',
      });
    }
    return resultUpdated;
  }

  private checkSegmentsOrder(segments: SegmentCreateDTO[]) {
    const orderSequence = Array.from({ length: segments.length }, (_, i) => i + 1);
    let orders: number[] = segments.map((s) => s.order);
    let valid = orders.every((v) => orderSequence.includes(v));

    if (!valid) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'El orden de los segmentos es inconsistente.',
      });
    }
  }
}
