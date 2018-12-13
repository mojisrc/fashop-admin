import fa from "@/utils/fa";
export default {
    async list(data = {}) {
        return fa.request({
            method: "GET",
            data
        });
    },
    async token(data = {}) {
        return fa.request({
            url: `/admin/member/token`,
            method: "POST",
            data
        });
    },
    async selfEdit(data = {}) {
        return fa.request({
            url: `/admin/member/selfEdit`,
            method: "POST",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `/admin/member/add`,
            method: "POST",
            data
        });
    },
    async verifyCode(data = {}) {
        return fa.request({
            url: `/admin/member/verifyCode`,
            method: "GET",
            data
        });
    },
    async del(data = {}) {
        return fa.request({
            url: `/admin/member/del`,
            method: "POST",
            data
        });
    },
    async logout(data = {}) {
        return fa.request({
            url: `/admin/member/logout`,
            method: "GET",
            data
        });
    },
    async self(data = {}) {
        return fa.request({
            url: `/admin/member/self`,
            method: "GET",
            data
        });
    },
    async selfPassword(data = {}) {
        return fa.request({
            url: `/admin/member/selfPassword`,
            method: "POST",
            data
        });
    },
    async login(data = {}) {
        return fa.request({
            url: `/admin/member/login`,
            method: "POST",
            data
        });
    }
};
