import fa from "@/fa";

export default {
    async list(data = {}) {
        return await fa.request({
            url: `shipper/list`,
            method: "GET",
            data
        });
    },
    async info(data = {}) {
        return await fa.request({
            url: `shipper/info`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return await fa.request({
            url: `shipper/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return await fa.request({
            url: `shipper/edit`,
            method: "POST",
            data
        });
    },
    async del(data = {}) {
        return await fa.request({
            url: `shipper/del`,
            method: "POST",
            data
        });
    },
    async setDefault(data = {}) {
        return await fa.request({
            url: `shipper/setDefault`,
            method: "POST",
            data
        });
    }
};
