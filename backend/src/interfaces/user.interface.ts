import { ROLES } from "src/constants/roles";

export interface IUser{
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string 
}