import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/admin/Assetsrecharge/list`,
            method: "GET",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/admin/Assetsrecharge/info`,
            method: "GET",
            data
        });
    },

};
