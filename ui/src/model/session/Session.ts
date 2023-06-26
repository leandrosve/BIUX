import { User } from '../user/User';

export interface SessionData {
  accessToken: string;
  user: User;
}
