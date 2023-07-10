import { User } from '../user/User';

export default interface Routine {
  name: string;
  description?: string;
  segments: RoutineSegment[];
  students: User[];
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
