import fa from "@/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `express/list`,
            method: "POST",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `express/info`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `express/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return fa.request({
            url: `express/edit`,
            method: "POST",
            data
        });
    },
    async del(data = {}) {
        return fa.request({
            url: `express/del`,
            method: "POST",
            data
        });
    },
    async setCommonlyUse(data = {}) {
        return fa.request({
            url: `express/setCommonlyUse`,
            method: "POST",
            data
        });

    }
};
