import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/admin/goodstag/list`,
            method: "POST",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `/admin/goodstag/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return fa.request({
            url: `/admin/goodstag/edit`,
            method: "POST",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/admin/goodstag/info`,
            method: "GET",
            data
        });
    },
    async del(data = {}) {
        return fa.request({
            url: `/admin/goodstag/del`,
            method: "POST",
            data
        });
    }
};
