import {RedmineApi} from "./RedmineApi";
import {GasApiRequest} from "./entity/GasApiRequest";
import {GasApi} from "./GasApi";

async function main() {
    const redmineApi = new RedmineApi();
    const res = await redmineApi.getIssues();
    const issues = res.data.issues;
    const params = [];
    let tmp = new GasApiRequest();
    for (let i = 0; i < issues.length; i++) {
        tmp = new GasApiRequest();
        tmp.issueId = issues[i].id;
        tmp.updateDateTime = issues[i].updated_on.replace("T", " ").replace("Z", "");
        tmp.title = issues[i].subject;
        params.push(tmp);
    }
    const gasApi = new GasApi();
    const res2 = gasApi.postTicketSummary(params);
    console.log(res2);
}

main().then(r => console.log(r));