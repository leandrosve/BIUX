import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SegmentsEntity } from './entities/segments.entity';


@Injectable()
export class SegmentsService {
      constructor(
        @InjectRepository(SegmentsEntity)
        private readonly settingRepository: Repository<SegmentsEntity>,
        ){}

        public async getSegment(segmentId:number){
          return await 'this segments'
        }

        public async create(){
          
        }
        
}
