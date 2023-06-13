import { SetMetadata } from "@nestjs/common";
import { INSTRUCTOR_KEY } from "src/constants/key-decorators";
import { ROLES } from "src/constants/roles";

export const Instructor=()=>SetMetadata(INSTRUCTOR_KEY,ROLES.INSTRUCTOR)