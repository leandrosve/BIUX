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
  role?: string;
}

export default class AuthService extends APIService {
  protected static PATH = '/auth';

  static async login(data: LoginData): Promise<APIResponse<SessionData>> {
    return this.post('/login', data, { preventSignOut: true });
  }

  static async signUp(data: SignupData): Promise<APIResponse<void>> {
    return this.post('/register', data);
  }
}
