import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `image/list`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `image/add`,
            method: "POST",
            data
        });
    }
};
