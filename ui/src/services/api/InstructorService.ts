import { InstructorCode } from '../../model/instructor/InstructorCode';
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
    return this.post<{valid: boolean, user:User}>('/code/check', {code});
  }
}
