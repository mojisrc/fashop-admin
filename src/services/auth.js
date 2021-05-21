import fa from "@/utils/fa";

export default {
    async groupAuthorise(data = {}) {
        return fa.request({
            url: `/admin/auth/groupAuthorise`,
            method: "POST",
            data
        });
    },
    async ruleTree(data = {}) {
        return fa.request({
            url: `/admin/auth/ruleTree`,
            method: "GET",
            data
        });
    },
    async groupInfo(data = {}) {
        return fa.request({
            url: `/admin/auth/groupInfo`,
            method: "GET",
            data
        });
    },
    async groupMemberEdit(data = {}) {
        return fa.request({
            url: `/admin/auth/groupMemberEdit`,
            method: "POST",
            data
        });
    },
    async groupDel(data = {}) {
        return fa.request({
            url: `/admin/auth/groupDel`,
            method: "POST",
            data

        });
    },
    async groupAdd(data = {}) {
        return fa.request({
            url: `/admin/auth/groupAdd`,
            method: "POST",
            data
        });
    },
    async groupEdit(data = {}) {
        return fa.request({
            url: `/admin/auth/groupEdit`,
            method: "POST",
            data
        });
    },
    async groupMemberList(data = {}) {
        return fa.request({
            url: `/admin/auth/groupMemberList`,
            method: "GET",
            data
        });
    },
    async groupList(data = {}) {
        return fa.request({
            url: `/admin/auth/groupList`,
            method: "GET",
            data
        });
    }
};


