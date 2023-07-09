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
