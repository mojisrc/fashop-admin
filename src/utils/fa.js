import request from "@/utils/request";

export default {
    async request(options) {
        return request(`https://127.0.0.1/admin/${options.url}`, {
            "Access-Token": "xxx",
            "method": options.method,
            "body": options.data
        });
    }
};
