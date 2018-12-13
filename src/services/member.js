import fa from "@/fa";
export default {
    async del(data = {}) {
        return await fa.request({
            url: `member/del`,
            method: "POST",
            data
        });
    },
    async token(data = {}) {
        return await fa.request({
            url: `member/token`,
            method: "POST",
            data
        });
    },
    async selfEdit(data = {}) {
        return await fa.request({
            url: `member/selfEdit`,
            method: "POST",
            data
        });
    },
    async add(data = {}) {
        return await fa.request({
            url: `member/add`,
            method: "POST",
            data
        });
    },
    async list(data = {}) {
        return await fa.request({
            method: "GET",
            data
        });
    },
    async verifyCode(data = {}) {
        return await fa.request({
            url: `member/verifyCode`,
            method: "GET",
            data
        });
    },
    async logout(data = {}) {
        return await fa.request({
            url: `member/logout`,
            method: "GET",
            data
        });
    },
    async self(data = {}) {
        return await fa.request({
            url: `member/self`,
            method: "GET",
            data
        });
    },
    async selfPassword(data = {}) {
        return await fa.request({
            url: `member/selfPassword`,
            method: "POST",
            data
        });
    },
    async login(data = {}) {
        return await fa.request({
            url: `member/login`,
            method: "POST",
            data
        });
    }
};
