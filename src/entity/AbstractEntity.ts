
export abstract class AbstractEntity {
    protected constructor() {
    }
    public bindObject(obj: any) {
        for (const prop in this) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                this[prop] = obj[prop];
            }
        }
    }
}