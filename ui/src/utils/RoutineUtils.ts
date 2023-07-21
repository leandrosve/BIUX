import Routine, { DraggableSegment, ReducedRoutine, RoutineSegment } from '../model/routines/Routine';

export default class RoutineUtils {
  public static LOCAL_ID_PREFIX = 'localId-'; // prefix used to allow drag and drop
  public static getRandomLocalId = () => this.LOCAL_ID_PREFIX + crypto.randomUUID();
  public static sortSegments = (segments: RoutineSegment[]) => segments.sort((a, b) => (a.order > b.order ? 1 : -1));
  public static generateLocalIds = (segments: RoutineSegment[]) => segments.map((s) => ({ ...s, localId: `${s.id}` }));
  public static initializeSegments = (segments: RoutineSegment[]) => this.generateLocalIds(this.sortSegments(segments));

  public static insertAndReorderItems = (items: DraggableSegment[], previousIndex: number, newIndex: number) => {
    const orderedItems = [...items];
    const el = orderedItems.splice(previousIndex, 1)[0];
    orderedItems.splice(newIndex, 0, el);
    return this.reorderItems(orderedItems)
  };

  public static removeAndReorderItems(items: DraggableSegment[], segment: DraggableSegment) {
    const filtered = items.filter((s) => s.localId !== segment.localId);
    console.log(filtered);
    return this.reorderItems(filtered);
  }

  public static reorderItems(items: DraggableSegment[]) {
    return items.map((item, index) => ({ ...item, order: index + 1 }));
  }

  public static toReducedRoutine(routine: Routine): ReducedRoutine {
    return {
      id: routine.id ?? -1,
      name: routine.name,
      description: routine.description,
      totalDuration: routine.segments.reduce((acc, obj) => {
        return acc + obj.duration;
      }, 0),
    };
  }
}
