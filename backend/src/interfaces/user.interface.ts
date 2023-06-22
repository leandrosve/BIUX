import { ROLES } from "src/constants/roles";

export interface IUser{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string 
}