import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/admin/brand/list`,
            method: "GET",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/admin/brand/info`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `/admin/brand/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return fa.request({
            url: `/admin/brand/edit`,
            method: "POST",
            data
        });
    },
    async del(data = {}) {
        return fa.request({
            url: `/admin/brand/del`,
            method: "POST",
            data
        });
    }
};
