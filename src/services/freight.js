import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `freight/list`,
            method: "POST",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `freight/info`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `freight/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return fa.request({
            url: `freight/edit`,
            method: "POST",
            data
        });
    },
    async del(data = {}) {
        return fa.request({
            url: `freight/del`,
            method: "POST",
            data
        });
    }
};
