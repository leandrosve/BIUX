import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RoutineCreateDTO } from './dto/routine.create.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { RoutineUpdateDTO } from './dto/routine.update.dto';
import { SegmentCreateDTO } from 'src/segments/dto/segment.create.dto';
import { RoutineRepository } from './routines.repository';
import { RoutineGetFullDTO } from './dto/routine.full.dto';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SegmentsEntity } from 'src/segments/entities/segments.entity';
import { RoutineReducedDTO } from './dto/routine.reduced.dto';
import { CollectionUtils } from 'src/utils/CollectionUtils';
import { RoutineInstructorStudentRepository } from 'src/instructor/repository/routinesInstructorsStudents.repository';

@Injectable()
export class RoutinesService {
  constructor(
    private readonly routineRepository: RoutineRepository,
    private readonly userService: UsersService,
    private readonly routineInstructorStudentRepository: RoutineInstructorStudentRepository,
    
    @InjectRepository(SegmentsEntity)
    private readonly segmentsRepository: Repository<SegmentsEntity>
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
    return this.details(userId, result.id);
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

  public async getFullRoutine(userId: number, routineId: number): Promise<RoutineGetFullDTO> {
    const result = await this.routineRepository.getFullRoutine(userId, routineId);

    const students = result.routineInstructorStudents.map((relation) => relation.student);
    delete result.routineInstructorStudents;
    if (result) {
      return {
        ...result,
        students,
      };
    }
    throw new ErrorManager({
      type: 'NOT_FOUND',
      message: 'No se encontro la rutina',
    });
  }

  public async update(instructorId: number, routineId: number, body: RoutineUpdateDTO) {
    const { segments, students:studentsBody, ...routineData } = body;

    const routine = await this.details(instructorId, routineId);
    await this.checkSegmentsOrder(body.segments);

    //delete routineData['students']
    // Actualizar los datos de la rutina
    const resultUpdated: UpdateResult = await this.routineRepository.update(routineId, routineData);

    // Actualizar o crear los segmentos
    const updateSegments = segments.filter((segment) => segment.id != null || segment.id != undefined);
    const newSegments = segments.filter((segment) => segment.id == null || segment.id == undefined);
    await Promise.all(
      updateSegments.map(async (data) => {
        await this.segmentsRepository.update(data.id, data);
      })
    );

    if (newSegments.length >= 1) {
      await Promise.all(
        newSegments.map(async (data) => {
          // Segmento nuevo, crearlo y asociarlo a la rutina
          const newSegment = await this.segmentsRepository.create(data);
          newSegment.routine = routine;
          await this.segmentsRepository.save(newSegment);
        })
      );
    }

    // Eliminar los segmentos que no están presentes en la lista actualizada
    const segmentIdsToRemove = routine.segments
      .filter((segment) => !updateSegments.some((updatedSegment) => updatedSegment.id === segment.id))
      .map((segment) => segment.id);
    if (segmentIdsToRemove.length > 0) {
      await this.segmentsRepository.delete(segmentIdsToRemove);
    }
    const oldStudentsIDs = (await this.routineInstructorStudentRepository.getStudentsByRoutineId(instructorId,routineId)).map((s) => s.id);

    // Alumnos asignados
    const {newItems,removedItems}=CollectionUtils.getChangesInCollection(oldStudentsIDs,studentsBody);
    if (newItems.length >=1){
      await Promise.all(
        newItems.map(async (data) => {
           await this.routineInstructorStudentRepository.createRoutineInstructorStudent(routineId,instructorId,data);
        })
      );
    }

    if(removedItems.length>=1){
      await Promise.all(
        removedItems.map( async (data)=>{
          await this.routineInstructorStudentRepository
          .createQueryBuilder()
          .softDelete()
          .where('student_id = :studentId', { studentId:data })
          .execute();
        })
      )
    }
    console.log('newItems', newItems);

    console.log('removedItems', removedItems)



    if (resultUpdated.affected == 0) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'No se pudo realizar la actualizacion',
      });
    }
    return await this.getFullRoutine(instructorId, routineId);
  }

  private checkSegmentsOrder(segments: SegmentCreateDTO[]) {
    const orderSequence = Array.from({ length: segments.length }, (_, i) => i + 1);
    let orders: number[] = segments.map((s) => s.order);
    let valid = orders.every((v) => orderSequence.includes(v));

    const hasDuplicates = orders.some((v, i) => orders.indexOf(v) !== i);

    if (!valid || hasDuplicates) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'El orden de los segmentos es inconsistente.',
      });
    }
  }

  public async getStudentsByRoutine(instructorId: number, routineId: number) {
    return await 'students';
  }

  public async getReducedRoutinesForStudent(studentUserId: number): Promise<RoutineReducedDTO[]> {
    return await this.routineRepository.getReducedRoutinesForStudent(studentUserId);
  }
}
