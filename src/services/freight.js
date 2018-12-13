import fa from "@/fa";

export default {
    async list(data = {}) {
        return await fa.request({
            url: `freight/list`,
            method: "POST",
            data
        });
    },
    async info(data = {}) {
        return await fa.request({
            url: `freight/info`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return await fa.request({
            url: `freight/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return await fa.request({
            url: `freight/edit`,
            method: "POST",
            data
        });
    },
    async del(data = {}) {
        return await fa.request({
            url: `freight/del`,
            method: "POST",
            data
        });
    }
};
