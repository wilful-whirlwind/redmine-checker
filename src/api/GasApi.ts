import {AbstractApi} from "./AbstractApi";
import {ConfigLoader} from "../config/ConfigLoader";
import {RedmineApiRequestHeader} from "./entity/RedmineApiRequestHeader";
import {RedmineApiRequestQuery} from "./entity/RedmineApiRequestQuery";
import {TicketSummary} from "../entity/TicketSummary";
import {GasApiRequest} from "./entity/GasApiRequest";

export class GasApi extends AbstractApi
{
    constructor() {
        super();
    }

    public async postTicketSummary(gasApiRequestList: GasApiRequest[]) {
        const gasApiEndPoint = ConfigLoader.getConfig("gas", "api_endpoint");
        if (typeof gasApiEndPoint !== "string") {
            throw new Error("gas APIエンドポイントが不正です。");
        }
        if (gasApiRequestList.length < 1) {
            return [];
        }
        const res = await this.callPostApi(
            gasApiEndPoint,
            gasApiRequestList,
            {}
        )
        console.log(res);
        return res;
    }
}

