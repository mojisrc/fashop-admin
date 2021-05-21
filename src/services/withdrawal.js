import fa from "@/utils/fa";

export default {
    async settingInfo(data = {}) {
        return fa.request({
            url: `/admin/withdrawal/settingInfo`,
            method: "GET",
            data
        });
    },
    async settingEdit(data = {}) {
        return fa.request({
            url: `/admin/withdrawal/settingEdit`,
            method: "POST",
            data
        });
    },
    async pageList(data = {}) {
        return fa.request({
            url: `/admin/withdrawal/pageList`,
            method: "GET",
            data
        });
    },
};
