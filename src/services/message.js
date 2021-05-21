import fa from "@/utils/fa";

export default {
    async taskList(data = {}) {
        return fa.request({
            url: `/admin/message/taskList`,
            method: "GET",
            data
        });
    },
    async taskAdd(data = {}) {
        return fa.request({
            url: `/admin/message/taskAdd`,
            method: "POST",
            data
        });
    },
    async memberCards(data = {}) {
        return fa.request({
            url: `/admin/message/memberCards`,
            method: "GET",
            data
        });
    },
    async selectableUsers(data = {}) {
        return fa.request({
            url: `/admin/message/selectableUsers`,
            method: "GET",
            data
        });
    },
    async pageList(data = {}) {
        return fa.request({
            url: `/admin/message/pageList`,
            method: "GET",
            data
        });
    }
};
