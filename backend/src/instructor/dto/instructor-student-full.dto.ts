import { RoutineReducedDTO } from 'src/routines/dto/routine.reduced.dto';
import { UserDTO } from 'src/users/dto/user.dto';

export default interface InstructorStudentFullDTO extends UserDTO {
    routines: RoutineReducedDTO[];
}