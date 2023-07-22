import { User } from '../user/User';

export default interface Student {
    id: number;
    user: User;
}

/* Student from the student viewpoint */
export interface StudentDetail {
    id: number;
    instructor: User;
}

export interface ReducedStudent{
    id: 2,
    firstName: string,
    lastName: string,
    email: string,
    role: string
}