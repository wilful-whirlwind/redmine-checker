import {AbstractEntity} from "./AbstractEntity";

export class TicketSummary extends AbstractEntity
{
    public issueId: number;
    public title: string;
    public status: number;
    public startDate: Date;
    public lastAssignDate: Date;
    public lastReturnDate: Date;
    public returnCount: number;
    public updateDateTime: Date;

    constructor(
        issueId: number, 
        title: string, 
        status: number, 
        startDate: Date,
        lastAssignDate: Date,
        lastReturnDate: Date,
        returnCount: number,
        updateDateTime: Date
    ) {
        super();
        this.issueId = issueId;
        this.title = title;
        this.status = status;
        this.startDate = startDate;
        this.lastAssignDate = lastAssignDate;
        this.lastReturnDate = lastReturnDate;
        this.returnCount = returnCount;
        this.updateDateTime = updateDateTime;
    }
}