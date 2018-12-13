import fa from "@/fa";

export default {
    async groupAuthorise(data = {}) {
        return fa.request({
            url: `auth/groupAuthorise`,
            method: "POST",
            data
        });
    },
    async ruleTree(data = {}) {
        return fa.request({
            url: `auth/ruleTree`,
            method: "GET",
            data
        });
    },
    async groupInfo(data = {}) {
        return fa.request({
            url: `auth/groupInfo`,
            method: "GET",
            data
        });
    },
    async groupMemberEdit(data = {}) {
        return fa.request({
            url: `auth/groupMemberEdit`,
            method: "POST",
            data
        });
    },
    async groupDel(data = {}) {
        return fa.request({
            url: `auth/groupDel`,
            method: "POST",
            data

        });
    },
    async groupAdd(data = {}) {
        return fa.request({
            url: `auth/groupAdd`,
            method: "POST",
            data
        });
    },
    async groupEdit(data = {}) {
        return fa.request({
            url: `auth/groupEdit`,
            method: "POST",
            data
        });
    },
    async groupMemberList(data = {}) {
        return fa.request({
            url: `auth/groupMemberList`,
            method: "GET",
            data
        });
    },
    async groupList(data = {}) {
        return fa.request({
            url: `auth/groupList`,
            method: "GET",
            data
        });
    }
};


