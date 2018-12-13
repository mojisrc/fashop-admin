import fa from "@/fa";
export default {
    async del(data = {}) {
        return fa.request({
            url: `member/del`,
            method: "POST",
            data
        });
    },
    async token(data = {}) {
        return fa.request({
            url: `member/token`,
            method: "POST",
            data
        });
    },
    async selfEdit(data = {}) {
        return fa.request({
            url: `member/selfEdit`,
            method: "POST",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `member/add`,
            method: "POST",
            data
        });
    },
    async list(data = {}) {
        return fa.request({
            method: "GET",
            data
        });
    },
    async verifyCode(data = {}) {
        return fa.request({
            url: `member/verifyCode`,
            method: "GET",
            data
        });
    },
    async logout(data = {}) {
        return fa.request({
            url: `member/logout`,
            method: "GET",
            data
        });
    },
    async self(data = {}) {
        return fa.request({
            url: `member/self`,
            method: "GET",
            data
        });
    },
    async selfPassword(data = {}) {
        return fa.request({
            url: `member/selfPassword`,
            method: "POST",
            data
        });
    },
    async login(data = {}) {
        return fa.request({
            url: `member/login`,
            method: "POST",
            data
        });
    }
};
