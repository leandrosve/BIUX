import { Injectable } from '@nestjs/common';

@Injectable()
export class RoutinesService {


  public async all(){
    return "alll";
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
