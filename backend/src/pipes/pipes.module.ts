import { Module } from '@nestjs/common';
import { RemoveFieldsRoutineUpdatePipe } from './remove-fields-routine-update';

@Module({
  providers: [RemoveFieldsRoutineUpdatePipe],
  exports: [RemoveFieldsRoutineUpdatePipe],
})
export class PipesModule {}
