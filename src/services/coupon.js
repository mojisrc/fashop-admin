import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/admin/coupon/list`,
            method: "GET",
            data
        });
    }
};
