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


export interface StudentFullDetails extends User {
   routines: ReducedRoutine[];
}
