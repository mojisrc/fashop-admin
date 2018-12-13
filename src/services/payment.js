import fa from "@/utils/fa";

export default {
    async edit(data = {}) {
        return fa.request({
            url: `payment/edit`,
            method: "POST",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `payment/info`,
            method: "GET",
            data
        });
    }
};
