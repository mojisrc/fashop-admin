import fa from "@/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `article/list`,
            method: "GET",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `article/info`,
            method: "GET",
            data
        });
    }
};
