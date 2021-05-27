import fa from "@/utils/fa";

export default {
    async moduleList(data = {}) {
        return fa.request({
            url: `/admin/auth/moduleList`,
            method: "GET",
            data
        });
    },
    async actionList(data = {}) {
        return fa.request({
            url: `/admin/auth/actionList`,
            method: "GET",
            data
        });
    },
    async policyList(data = {}) {
        return fa.request({
            url: `/admin/auth/policyList`,
            method: "GET",
            data
        });
    },
    async policyInfo(data = {}) {
        return fa.request({
            url: `/admin/auth/policyInfo`,
            method: "GET",
            data
        });
    },
    async policyAdd(data = {}) {
        return fa.request({
            url: `/admin/auth/policyAdd`,
            method: "POST",
            data
        });
    },
    async policyEdit(data = {}) {
        return fa.request({
            url: `/admin/auth/policyEdit`,
            method: "POST",
            data
        });
    },
    async policyDel(data = {}) {
        return fa.request({
            url: `/admin/auth/policyDel`,
            method: "POST",
            data
        });
    },
    async groupList(data = {}) {
        return fa.request({
            url: `/admin/auth/groupList`,
            method: "GET",
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
    async groupInfo(data = {}) {
        return fa.request({
            url: `/admin/auth/groupInfo`,
            method: "GET",
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
    async groupPolicyList(data = {}) {
        return fa.request({
            url: `/admin/auth/groupPolicyList`,
            method: "GET",
            data
        });
    },
    async groupPolicyAdd(data = {}) {
        return fa.request({
            url: `/admin/auth/groupPolicyAdd`,
            method: "POST",
            data
        });
    },
    async groupPolicyDel(data = {}) {
        return fa.request({
            url: `/admin/auth/groupPolicyDel`,
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
    async groupMemberAdd(data = {}) {
        return fa.request({
            url: `/admin/auth/groupMemberAdd`,
            method: "POST",
            data
        });
    },
    async groupMemberDel(data = {}) {
        return fa.request({
            url: `/admin/auth/groupMemberDel`,
            method: "POST",
            data
        });
    },
    async userList(data = {}) {
        return fa.request({
            url: `/admin/auth/userList`,
            method: "GET",
            data
        });
    },
    async selfPolicy(data = {}) {
        return fa.request({
            url: `/admin/auth/selfPolicy`,
            method: "GET",
            data
        });
    },

};


