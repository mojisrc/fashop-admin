import fa from "@/fa";

export default {
    async list(data = {}) {
        return await fa.request({
            url: `image/list`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return await fa.request({
            url: `image/add`,
            method: "POST",
            data
        });
    }
};
