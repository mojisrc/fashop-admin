import fa from "@/utils/fa";

export default {

    async list(data = {}) {
        return fa.request({
            url: `/admin/pointslog/list`,
            method: "GET",
            data
        });
    },

};
