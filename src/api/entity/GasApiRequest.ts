import {AbstractEntity} from "../../entity/AbstractEntity";

export class GasApiRequest extends AbstractEntity
{
    public issueId: number;
    public title: string;
    public updateDateTime: string;

    constructor() {
        super();
        this.issueId = 0;
        this.title = "";
        this.updateDateTime = "";
    }
}