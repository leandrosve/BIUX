import { SessionData } from '../../model/session/Session';
import { User } from '../../model/user/User';
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
  { id: 1, email: 'profesor@mock.com', firstName: 'Pro', lastName: 'Fesor', password: '12345' },
  { id: 2, email: 'alumno@mock.com', firstName: 'Al', lastName: ' Umno', password: '12345' },
];

const USE_MOCKED_DATA = false;
export default class AuthService extends APIService {
  static test = { email: 'profesor@gmail.com', password: '12345' };

  static async login(data: LoginData): Promise<APIResponse<SessionData>> {
    if (USE_MOCKED_DATA) return this.mockLogin(data);
    return this.post('/auth/login', data, { preventSignOut: true });
  }

  static async signUp(data: LoginData): Promise<APIResponse<null>> {
    // MOCKED
    await this.delay(1000);
    const user = existingUserMock.find((u) => data.email === u.email);
    if (user) {
      return { status: 200, data: null, hasError: false };
    }
    return { status: 400, errorMessage: 'El email ya se encuentra utilizado', hasError: true };
  }

  static async mockLogin(data: LoginData): Promise<APIResponse<SessionData>> {
    // MOCKED
    await this.delay(1000);
    const user = existingUserMock.find((u) => data.email === u.email && data.password === u.password);
    if (user) {
      return {
        status: 200,
        data: {
          authToken: 'asdasd',
          user: {
            createdAt: '',
            updatedAt: '',
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id,
            email: user.email,
            role: 'INSTRUCTOR',
          },
        },
        hasError: false,
      };
    }
    return { status: 401, errorMessage: 'unauthorized', hasError: true };
  }
}
