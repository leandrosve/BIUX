import { Injectable,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request  } from 'express';
import { RoutinesEntity } from './entities/routines.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoutinesService {
  constructor(
       @InjectRepository(RoutinesEntity)
   private readonly routineRepository: Repository<RoutinesEntity>,
  ) {}

  public async all(){
    return "all";
  }

  public async getStudentRoutines(id:number){
    return 'student routines: ' + id
  }

  // constructor(
  //   @InjectRepository(Routine)
  //   private readonly routineRepository: Repository<Routine>,
  //   @InjectRepository(User)
  //   private readonly userRepository: Repository<User>,
  //   @InjectRepository(UserRoutine)
  //   private readonly userRoutineRepository: Repository<UserRoutine>,
  // ) {}

  // async createRoutine(creatorId: number, name: string): Promise<Routine> {
  //   const creator = await this.userRepository.findOne(creatorId);
  //   const routine = this.routineRepository.create({ name, creator });
  //   return this.routineRepository.save(routine);
  // }

  // async assignRoutineToUsers(routineId: number, userIds: number[]): Promise<void> {
  //   const routine = await this.routineRepository.findOne(routineId);
  //   const users = await this.userRepository.findByIds(userIds);
  //   const userRoutines = users.map(user => this.userRoutineRepository.create({ user, routine }));
  //   await this.userRoutineRepository.save(userRoutines);
  // }
}
