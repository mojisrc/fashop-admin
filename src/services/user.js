import fa from "@/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `user/list`,
            method: "GET",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `user/info`,
            method: "GET",
            data
        });
    },
    async address(data = {}) {
        return fa.request({
            url: `user/address`,
            method: "GET",
            data
        });
    },
    async statistics(data = {}) {
        return fa.request({
            url: `user/statistics`,
            method: "GET",
            data
        });
    }
};
