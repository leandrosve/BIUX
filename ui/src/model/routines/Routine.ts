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
  id: string;
}
