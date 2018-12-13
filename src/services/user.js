import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/admin/user/list`,
            method: "GET",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/admin/user/info`,
            method: "GET",
            data
        });
    },
    async address(data = {}) {
        return fa.request({
            url: `/admin/user/address`,
            method: "GET",
            data
        });
    },
    async statistics(data = {}) {
        return fa.request({
            url: `/admin/user/statistics`,
            method: "GET",
            data
        });
    }
};
