import { InstructorCode } from '../../model/instructor/InstructorCode';
import Routine, { ReducedRoutine } from '../../model/routines/Routine';
import Student, { StudentFullDetails } from '../../model/student/Student';
import { User } from '../../model/user/User';
import APIService from './APIService';

export default class InstructorService extends APIService {
  protected static PATH = '/instructor';

  static async getCode() {
    return this.get<InstructorCode>('/code');
  }

  static async regenerateCode() {
    return this.post<InstructorCode>('/code/regenerate');
  }

  static async checkCode(code: string) {
    return this.post<{ valid: boolean; user: User }>('/code/check', { code });
  }

  static async createRoutine(data: Routine) {
    return await this.post<Routine>('/routines', data);
  }

  static async getRoutines() {
    return await this.get<ReducedRoutine[]>('/routines');
  }

  static async getRoutineDetail(id: number) {
    return await this.get<Routine>(`/routines/${id}`);
  }

  static async editRoutine(id: number, data: Partial<Routine>) {
    return await this.patch<Routine>(`/routines/${id}`, data);
  }

  static async getStudent(studentUserId: number) {
    return await this.get<StudentFullDetails>(`/students/${studentUserId}`);
  }
}
