
export class RedmineApiRequestQuery {
    public assignedToId: string;

    constructor(assignedToId: string) {
        this.assignedToId = assignedToId;
    }

    public getRequestBody() {
        return {
            "assigned_to_id": this.assignedToId
        };
    }
}