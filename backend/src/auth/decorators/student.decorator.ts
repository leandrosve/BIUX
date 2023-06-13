import { SetMetadata } from "@nestjs/common";
import { STUDENT_KEY } from "src/constants/key-decorators";
import { ROLES } from "src/constants/roles";

export const StudentAccess=()=>SetMetadata(STUDENT_KEY,ROLES.STUDENT)