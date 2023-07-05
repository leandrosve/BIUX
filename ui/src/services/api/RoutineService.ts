import Routine from '../../model/routines/Routine';
import APIService from './APIService';

export default class RoutineService extends APIService {
  protected static PATH = '/routines';

  static async createRoutine(data: Routine) {
    return await this.post<Routine>('/instructor', data);
  }

  static async getInstructorRoutines() {
    return await this.get<Routine[]>('/instructor');
  }

  static async getRoutineDetail(id: number) {
    return await this.get<Routine>(`/${id}`);
  }

  static async editRoutine(id: number, data: Partial<Routine>) {
    return await this.patch<Routine>(`/instructor/${id}`, data);
  }
}
