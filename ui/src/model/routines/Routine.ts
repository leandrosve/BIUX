export default interface Routine {
  name: string;
  description?: string;
  segments: RoutineSegment[];
  id?: number | string;
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
