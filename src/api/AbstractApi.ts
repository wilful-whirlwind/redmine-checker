import axios, {AxiosError} from 'axios'
import {type} from "os";

interface IErrorResponse {
    error: string
}

export abstract class AbstractApi
{
    protected constructor() {
    }

    /**
     * POST実行
     * @param url
     * @param request
     * @param header
     */
    public async callPostApi(url:string, request: any, header: any) {
        try {
            const response = await axios.post(url,request, {headers: header});
            if (typeof response === "undefined" || response === null) {
                throw new Error("APIのレスポンスが空です。");
            }
            return response;
        } catch (e) {
            console.error(e);
            throw new Error("APIの実行に失敗しました。");
        }
    }

    /**
     * Get実行
     * @param url
     * @param query
     * @param header
     */
    public async callGetApi(url:string, query: any, header: any) {
        try {
            if (typeof query !== "undefined" && query !== null) {
                url += "?";
                let queryStringArray = [];
                for (const prop in query) {
                    if (Object.prototype.hasOwnProperty.call(query, prop)) {
                        queryStringArray.push(prop + "=" +query[prop]);
                    }
                }
                url += queryStringArray.join("&");
            }
            const response = await axios.get(url, {headers: header});
            if (typeof response === "undefined" || response === null) {
                throw new Error("APIのレスポンスが空です。");
            }
            return response;
        } catch (e) {
            console.error(e);
            throw new Error("APIの実行に失敗しました。");
        }
    }
}