import APIService from './APIService';

interface LoginData {
  email: string;
  password: string;
}


const existingUserMock = { email: 'profesor@gmail.com', password: '12345' };

export default class AuthService extends APIService{
  static test = { email: 'profesor@gmail.com', password: '12345' };
  static async login(data: LoginData) {
    // MOCKED
    await this.delay(1000);
    if (data.email === existingUserMock.email && data.password === existingUserMock.password) {
      return { status: 200 };
    }
    return { status: 401 };
  }
}
