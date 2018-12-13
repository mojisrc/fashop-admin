import fa from "@/utils/fa";
export default {
    async list(data = {}) {
        return fa.request({
            url: `area/list`,
            method: "GET",
            data
        });
    }
};
