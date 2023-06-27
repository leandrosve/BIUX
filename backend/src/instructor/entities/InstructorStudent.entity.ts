import { BaseEntity } from '../../config/base.entity';
import { UsersEntity } from '../../users/entities/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity({name:'instructor_student'})
export class InstructorStudentEntity extends BaseEntity  {
    //muchos estudiantes le pertenecen a un Instructor


    //Instructor puede tener varias estudiantes a cargo

    // @ManyToOne(() => UsersEntity, user => user.instructorStudents)
    // instructor: UsersEntity;
  
    // @ManyToOne(() => UsersEntity, user => user.routineAssignments)
    // student: UsersEntity;
    @ManyToOne(() => UsersEntity, (instructor) => instructor.students)
    @JoinColumn({name:'instructor_id'})
    instructor: UsersEntity;
  
    @OneToOne(() => UsersEntity, student => student)
    @JoinColumn({name:'student_id'})
    student: UsersEntity;
  }
