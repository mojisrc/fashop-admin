import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/admin/categorypage/list`,
            method: "GET",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/admin/categorypage/info`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `/admin/categorypage/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return fa.request({
            url: `/admin/categorypage/edit`,
            method: "POST",
            data
        });
    },
    async setPortal(data = {}) {
        return fa.request({
            url: `/admin/categorypage/setPortal`,
            method: "POST",
            data
        });
    }
};
