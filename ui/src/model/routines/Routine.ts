import { ReducedStudent } from '../student/Student';

export default interface Routine {
  name: string;
  description?: string;
  segments: RoutineSegment[];
  students: ReducedStudent[];
  id?: number;
}

export interface RoutineCreateRequest {
  name: string;
  description?: string;
  segments: RoutineSegment[];
  students: number[];
  id?: number;
}

export interface ReducedRoutine {
  name: string;
  description?: string;
  totalDuration?: number;
  id: number;
}

export interface RoutineSegment {
  distance?: number;
  cadence: number;
  pulseRate: number;
  duration: number;
  description?: string;
  order: number;
  id?: number;
}

// Only to manage drag and drop functionality
export interface DraggableSegment extends RoutineSegment{
  localId: string;
}
