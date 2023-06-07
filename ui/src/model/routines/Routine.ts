export default interface Routine {
  name: string;
  description?: string;
  segments: RoutineSegment[];
}

export interface RoutineSegment {
  distance?: number;
  cadence: number;
  pulseRate: number;
  duration: number;
  description?: string;
  id: string;
}
