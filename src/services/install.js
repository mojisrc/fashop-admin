import fa from "@/utils/fa";

export default {
    async envStatus(data = {}) {
        return fa.request({
            url: `/admin/installer/envStatus`,
            method: "GET",
            data
        });
    },
    async checkDb(data = {}) {
        return fa.request({
            url: `/admin/installer/checkDb`,
            method: "POST",
            data
        });
    },
    async checkAdminAccount(data = {}) {
        return fa.request({
            url: `/admin/installer/checkAdminAccount`,
            method: "POST",
            data
        });
    },
    async run(data = {}) {
        return fa.request({
            url: `/admin/installer/run`,
            method: "POST",
            data
        });
    }
};
