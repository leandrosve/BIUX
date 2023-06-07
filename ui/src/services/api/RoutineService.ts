import Routine from '../../model/routines/Routine';
import APIService from './APIService';

export default class RoutineService extends APIService {
  static test = { email: 'profesor@gmail.com', password: '12345' };
  static async createRoutine(data: Routine) {
    // MOCKED
    await this.delay(1000);

    return { status: 200 };
  }
}
