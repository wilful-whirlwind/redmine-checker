
export class RedmineApiRequestHeader {
    public redmineApiKey: string;

    constructor(redmineApikey: string) {
        this.redmineApiKey = redmineApikey;
    }

    public getRequestHeader() {
        return {
            "X-Redmine-API-Key": this.redmineApiKey
        };
    }
}