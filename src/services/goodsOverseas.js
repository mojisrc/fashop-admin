import fa from "@/utils/fa";

export default {
    async configInfo(data = {}) {
        return fa.request({
            url: `/admin/goodsoverseas/configInfo`,
            method: "GET",
            data
        });
    },
    async configEdit(data = {}) {
        return fa.request({
            url: `/admin/goodsoverseas/configEdit`,
            method: "POST",
            data
        });
    },
    async pageList(data = {}) {
        return fa.request({
            url: `/admin/goodsoverseas/pageList`,
            method: "GET",
            data
        });
    },
};
