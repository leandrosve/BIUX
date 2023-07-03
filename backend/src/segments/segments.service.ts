import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SegmentsEntity } from './entities/segments.entity';
import { SegmentCreateDTO } from './dto/segment.create.dto';


@Injectable()
export class SegmentsService {
      constructor(
        @InjectRepository(SegmentsEntity)
        private readonly segmentsRepository: Repository<SegmentsEntity>,
        ){}

        public async getSegment(routine_id:number){

          return await "this segments";
        }
        public async getRoutineSegments(routine_id:number){
          const result= await this.segmentsRepository
          .createQueryBuilder('segments')
          .where("segments.routine_id = :routine_id", { routine_id })
          .getMany();
          return result;
        }
        public async create(body:SegmentCreateDTO){
          
          return await body
        }

       
        
}
