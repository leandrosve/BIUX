import { Entity, JoinColumn, ManyToOne,  OneToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { UsersEntity } from '../../users/entities/users.entity';






@Entity({name:'instructor_student'})
export class InstructorStudentEntity extends BaseEntity  {
    //muchos estudiantes le pertenecen a un Instructor

    @ManyToOne(() => UsersEntity, (instructor) => instructor.students)
    @JoinColumn({name:'instructor_id'})
    instructor: UsersEntity;
  
    @OneToOne(() => UsersEntity, student => student)
    @JoinColumn({name:'student_id'})
    student: UsersEntity;
  }
