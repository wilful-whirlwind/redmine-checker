import {AbstractApi} from "./AbstractApi";
import {ConfigLoader} from "../config/ConfigLoader";
import {RedmineApiRequestHeader} from "./entity/RedmineApiRequestHeader";
import {RedmineApiRequestQuery} from "./entity/RedmineApiRequestQuery";

export class RedmineApi extends AbstractApi
{
    constructor() {
        super();
    }

    public async getIssue(id: number) {
        const res = await this.callGetApi(
            "http://49.212.209.129/projects/1/issues.json",
            {issue_id: id.toString()},
            {
                "X-Redmine-API-Key": "ef067573fc6b681e52e08e78fcae0a35105f4635"
            }
        )
        return res;
    }

    public async getIssues() {
        const redmineApiEndPoint = ConfigLoader.getConfig("redmine", "api_endpoint");
        const redmineApiAccessKey = ConfigLoader.getConfig("redmine", "api_access_key");
        const redmineApiProjectId = ConfigLoader.getConfig("redmine", "project_id");
        const redmineApiAssignedToId = ConfigLoader.getConfig("redmine", "assigned_to_id");
        if (typeof redmineApiAccessKey !== "string") {
            throw new Error("redmine アクセスキーが不正です。");
        }
        const redmineApiRequestHeader = new RedmineApiRequestHeader(redmineApiAccessKey);

        if (typeof redmineApiAssignedToId !== "string") {
            throw new Error("redmine 対象ユーザIDが不正です。");
        }
        const redmineApiRequestQuery = new RedmineApiRequestQuery(redmineApiAssignedToId);
        const res = await this.callGetApi(
            redmineApiEndPoint + "/projects/" + redmineApiProjectId +"/issues.json",
            redmineApiRequestQuery.getRequestBody(),
            redmineApiRequestHeader
        )
        return res;
    }
}

