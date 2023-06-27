import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SettingEntity } from './entities/setting.entity';
import { UsersEntity } from 'src/users/entities/users.entity';
import { SETTING_DEFAULT } from 'src/constants/setting-default';
import { ErrorManager } from 'src/utils/error.manager';
import { SettingCreateDTO } from './dto/setting.create.dto';
import { SettingUpdateDTO } from './dto/setting.update.dto';


@Injectable()
export class SettingsService {
      constructor(
        @InjectRepository(SettingEntity)
        private readonly settingRepository: Repository<SettingEntity>,
        ){}


        public async created(user:UsersEntity):Promise<SettingEntity>{
          try {

            const settingNew:SettingCreateDTO={
              ...SETTING_DEFAULT,
              user,
            }
            const setting= await this.settingRepository.save(settingNew);

             if(setting){
              return setting
            }
           throw new ErrorManager({
            type:'BAD_REQUEST',
            message: 'No se pudo crear el setting por default'
          })
          } catch (error) {
           throw error;
          }

        }

        public async getSetting(user_id:number){
          try {
            
            const setting: SettingEntity = await this.settingRepository
            .createQueryBuilder('setting')
            .where("setting.user_id = :user_id", { user_id })
            .getOne()

            if(setting){
              return setting;
            }
            throw new ErrorManager({
              type:'BAD_REQUEST',
              message: 'No se encontro una configuracion para este usuario'
            })
            
          } catch (error) {
           throw error;
          }
        }

        public async update(user_id:number,body: SettingUpdateDTO){
          try {
            const {id: id_setting}=await this.getSetting(user_id);
            const setting:UpdateResult=await this.settingRepository.update(id_setting,body)
            if(setting.affected==0){
              throw new ErrorManager({
                type:'BAD_REQUEST',
                message: 'No se pudo realizar la actualizacion'
              })
            }
            console.log("id del usuario: ",user_id)
            const settingObj=await this.getSetting(user_id)
            return  {
              statusCode:200,
              message:'Se acutualizo la configuracion del usuario',
              data:settingObj
            } 

          } catch (error) {
           throw error;
          }

        }


        public async findBy(user_id:number){
          const setting: SettingEntity[] = await this.settingRepository
          .createQueryBuilder('setting')
          .where("setting.user_id = :user_id", { user_id })
          .getMany()
          return setting
        }
        public async findAll(){
          try {
            const result=await this.settingRepository
            .find({
              order: {
                createdAt: 'ASC',
              },
            });
    
            return result
          } catch (error) {
            throw new Error(error)
          }
        }


        
}
