import { ReducedRoutine } from '../routines/Routine';
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
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: string
}

export interface StudentFullDetails extends User {
   routines: ReducedRoutine[];
}
