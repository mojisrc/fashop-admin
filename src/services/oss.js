import fa from "@/utils/fa";

export default {
    async edit(data = {}) {
        return fa.request({
            url: `/admin/oss/settingEdit`,
            method: "POST",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/admin/oss/settingInfo`,
            method: "GET",
            data
        });
    },
};
