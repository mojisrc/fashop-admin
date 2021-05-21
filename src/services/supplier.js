import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/admin/supplier/list`,
            method: "GET",
            data
        });
    },
    async selectableUsers(data = {}) {
        return fa.request({
            url: `/admin/supplier/selectableUsers`,
            method: "GET",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/admin/supplier/info`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `/admin/supplier/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return fa.request({
            url: `/admin/supplier/edit`,
            method: "POST",
            data
        });
    },
    async del(data = {}) {
        return fa.request({
            url: `/admin/supplier/del`,
            method: "POST",
            data
        });
    }
};
