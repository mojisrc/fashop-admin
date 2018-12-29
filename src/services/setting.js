import fa from "@/utils/fa";

export default {
    async add(data = {}) {
        return fa.request({
            url: `/admin/setting/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return fa.request({
            url: `/admin/setting/edit`,
            method: "POST",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/admin/setting/info`,
            method: "GET",
            data
        });
    },
};
