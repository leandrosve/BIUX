import { SessionData } from '../../model/session/Session';
import APIService, { APIResponse } from './APIService';

interface LoginData {
  email: string;
  password: string;
}

const existingUserMock = [
  { userId: 1, email: 'profesor@mock.com', name:'Pro Fesor', password: '12345' },
  { userId: 2, email: 'alumno@mock.com', name: 'Al Umno',  password: '12345' },
];

export default class AuthService extends APIService {
  static test = { email: 'profesor@gmail.com', password: '12345' };
  static async login(data: LoginData): Promise<APIResponse<SessionData>> {
    // MOCKED
    await this.delay(1000);
    const user = existingUserMock.find((u) => data.email === u.email && data.password === u.password);
    if (user) {
      return { status: 200, data: { name:user.name, userId: user.userId, email: user.email, role: 'INSTRUCTOR' }, hasError: false };
    }
    return { status: 401, error: { message: 'unauthorized' }, hasError: true };
  }
}
