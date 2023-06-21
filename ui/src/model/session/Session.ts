import { User } from '../user/User';

export interface SessionData {
  authToken: string;
  user: User;
}
