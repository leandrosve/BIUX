import { Injectable,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request  } from 'express';
import { RoutinesEntity } from './entities/routines.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { RoutineCreateDTO } from './dto/routine.create.dto';
import { UsersEntity } from 'src/users/entities/users.entity';

@Injectable()
export class RoutinesService {
  constructor(
       @InjectRepository(RoutinesEntity)
   private readonly routineRepository: Repository<RoutinesEntity>,
   @InjectRepository(RoutinesEntity)
   private readonly userRepository: Repository<UsersEntity>,
   private readonly userService: UsersService,
  ) {}

  public async all(){
    return "all";
  }

  public async getStudentRoutines(userId:number){
    return 'student routines: ' + userId
  }
  public async createdRoutine(userId:number, body:RoutineCreateDTO){
    const user=await this.userService.findUserById(userId)

    //console.log(user)
    return await {msj:"created: " + userId, data:user,body}
  }


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
