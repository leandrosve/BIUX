import { SessionData } from '../../model/session/Session';
import APIService, { APIResponse } from './APIService';

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const existingUserMock = [
  { userId: 1, email: 'profesor@mock.com', name: 'Pro Fesor', password: '12345' },
  { userId: 2, email: 'alumno@mock.com', name: 'Al Umno', password: '12345' },
];

export default class AuthService extends APIService {
  static test = { email: 'profesor@gmail.com', password: '12345' };
  static async login(data: LoginData): Promise<APIResponse<SessionData>> {
    // MOCKED
    await this.delay(1000);
    const user = existingUserMock.find((u) => data.email === u.email && data.password === u.password);
    if (user) {
      return { status: 200, data: { name: user.name, userId: user.userId, email: user.email, role: 'INSTRUCTOR' }, hasError: false };
    }
    return { status: 401, error: { message: 'unauthorized' }, hasError: true };
  }

  static async signUp(data: LoginData): Promise<APIResponse<null>> {
    // MOCKED
    await this.delay(1000);
    const user = existingUserMock.find((u) => data.email === u.email);
    if (user) {
      return { status: 200, data: null, hasError: false };
    }
    return { status: 400, error: { message: 'El email ya se encuentra utilizado' }, hasError: true };
  }
}
