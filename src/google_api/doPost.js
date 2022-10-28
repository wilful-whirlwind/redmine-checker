function doPost(e) {
    const params = JSON.parse(e.postData.getDataAsString());
    let line = [];
    let result = [];
    let requestIssueIdList = [];
    for (i = 0; i < params.length; i++) {
        if (typeof params[i].issueId === "number") {
            line.push(params[i].issueId);
            requestIssueIdList.push(params[i].issueId);
        } else {
            throw new Error("issueIdが不正です。");
        }
        if (typeof params[i].title === "string") {
            line.push(params[i].title);
        } else {
            line.push("");
        }
        if (typeof params[i].updateDateTime === "string") {
            line.push(params[i].updateDateTime);
        } else {
            line.push("");
        }
        result[params[i].issueId] = line;
        line = [];
    }
    return ContentService.createTextOutput(JSON.stringify(upsertIssueList(requestIssueIdList, result)));
}

function upsertIssueList(requestIssueIdList, requestIssueList) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("マスタ");
    const savedIssueList = sheet.getRange(1, 1, sheet.getLastRow(), 8).getValues();
    const targetRowList = [];
    const requestInsertIssueList = [];
    let isExist = false;
    for (let j = 0; j < requestIssueList.length; j++) {
        if (!requestIssueList[j]) {
            continue;
        }
        isExist = false;
        hitRow = 0;
        for (let row = 1; row < savedIssueList.length; row++) {
            if (savedIssueList[row][0] == requestIssueList[j][0]) {
                targetRowList.push(row);
                isExist = true;
            }
        }
        if (!isExist) {
            requestInsertIssueList.push(requestIssueList[j])
        }
        if (requestIssueList.length === targetRowList.length + requestInsertIssueList.length) {
            break;
        }
    }
    let res = [];
    if (targetRowList.length > 0) {
        res["update"] = updateRows(targetRowList, requestIssueList, requestIssueIdList);
    } else {
        res["update"] = 0;
    }

    if (requestInsertIssueList.length > 0) {
        res["insert"] = insertRows(requestInsertIssueList)
    } else {
        res["insert"] = 0;
    }
    return  res;
}

function updateRows(targetRowList, requestIssueList, requestIssueIdList) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("マスタ");
    const savedIssueList = sheet.getRange(1, 1, sheet.getLastRow(), 8).getValues();
    let updateTmpArray = [];
    let resCount = 0;
    for (let row = 1; row < savedIssueList.length; row++) {
        updateTmpArray = [];
        if (
            savedIssueList[row][2] == 0 &&
            requestIssueIdList.indexOf(savedIssueList[row][0]) < 0
        ) {
            updateTmpArray = savedIssueList[row];
            updateTmpArray[2] = 1;
            updateTmpArray[5] = getDateStr();
            updateTmpArray[6] = updateTmpArray[6] + 1;
            sheet.getRange(row + 1, 1, 1, 8).setValues([updateTmpArray]);
            resCount++;
        }
        if (
            savedIssueList[row][2] == 1 &&
            requestIssueIdList.indexOf(savedIssueList[row][0]) >= 0
        ) {
            updateTmpArray = savedIssueList[row];
            updateTmpArray[2] = 0;
            updateTmpArray[4] = getDateStr();
            updateTmpArray[7] = requestIssueList[row][7];
            sheet.getRange(row + 1, 1, 1, 8).setValues([updateTmpArray]);
            resCount++;
        }
    }
    return resCount;
}

function insertRows(requestIssueList) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("マスタ");
    let insertRecords = [];
    let date = new Date();
    const hours = date.getHours();
    let startDate = "";
    if (hours < 8) {
        // 現在時刻が8時より前の新規レコードは前日開始扱いになる。
        date.setDate(date.getDate() - 1);
    }
    let dayStr = Utilities.formatDate(date, 'JST', 'yyyy-MM-dd');

    for (let i = 0; i < requestIssueList.length; i++) {
        if (!requestIssueList[i]) {
            continue;
        }
        insertRecords.push([
            requestIssueList[i][0], //issueId
            requestIssueList[i][1], //title
            0, //status
            dayStr, //startDate
            dayStr, //lastAssigndate
            "", // lastReturnDate
            0, // returnCount
            requestIssueList[i][2], // updateDateTime
        ]);
    }
    sheet.getRange(sheet.getLastRow() + 1, 1, insertRecords.length, 8).setValues(insertRecords);
    return requestIssueList.length;
}

function getDateStr() {
    let date = new Date();
    const hours = date.getHours();
    let startDate = "";
    if (hours < 8) {
        // 現在時刻が8時より前の新規レコードは前日開始扱いになる。
        date.setDate(date.getDate() - 1);
    }
    let dayStr = Utilities.formatDate(date, 'JST', 'yyyy-MM-dd');
    return dayStr;
}

