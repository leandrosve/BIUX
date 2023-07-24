export class CollectionUtils {

    public static getChangesInCollection<T>(oldCol: T[], newCol:T[]){
        const newItems = newCol.filter(item => !oldCol.includes(item));

        const removedItems = oldCol.filter(item => !newCol.includes(item));
        
        return {newItems, removedItems};
    }

}