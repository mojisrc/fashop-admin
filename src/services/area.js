import fa from "@/fa";

export default {
    async list(data = {}) {
        return await fa.request({
            url: `area/list`,
            method: "GET",
            data
        });
    }
};
