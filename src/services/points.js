import fa from "@/utils/fa";

export default {
    async goods(data = {}) {
        return fa.request({
            url: `/admin/points/goodsList`,
            method: "GET",
            data
        });
    },
    async give(data = {}) {
        return fa.request({
            url: `/admin/points/give`,
            method: "POST",
            data
        });
    },
    async selectableUsers(data = {}) {
        return fa.request({
            url: `/admin/points/selectableUsers`,
            method: "GET",
            data
        });
    },

};
