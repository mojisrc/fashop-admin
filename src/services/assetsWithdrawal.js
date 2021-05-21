import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/admin/assetswithdrawal/list`,
            method: "GET",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/admin/assetswithdrawal/info`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `/admin/assetswithdrawal/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return fa.request({
            url: `/admin/assetswithdrawal/edit`,
            method: "POST",
            data
        });
    },
    async del(data = {}) {
        return fa.request({
            url: `/admin/assetswithdrawal/del`,
            method: "POST",
            data
        });
    },
    async examine(data = {}) {
        return fa.request({
            url: `/admin/assetswithdrawal/examine`,
            method: "POST",
            data
        });
    },
    async payment(data = {}) {
        return fa.request({
            url: `/admin/assetswithdrawal/payment`,
            method: "POST",
            data
        });
    }
};
