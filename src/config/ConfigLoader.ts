import ConfigJson from "./config.json";

export class ConfigLoader {
    constructor() {
    }

    public static getConfig(target: string, key: string) {
        switch (target) {
            case "redmine":
                return this.getRedmineConfig(key);
            case "gas":
                return this.getRasConfig(key);
            default:
                return null;
        }
    }

    private static getRedmineConfig(key: string) {
        switch (key) {
            case "api_access_key":
                return ConfigJson.redmine.api_access_key;
            case "api_endpoint":
                return ConfigJson.redmine.api_endpoint;
            case "assigned_to_id":
                return ConfigJson.redmine.assigned_to_id;
            case "project_id":
                return ConfigJson.redmine.project_id;
            default:
                return null;
        }
    }

    private static getRasConfig(key: string) {
        switch (key) {
            case "api_endpoint":
                return ConfigJson.gas.api_endpoint;
            default:
                return null;
        }
    }
}