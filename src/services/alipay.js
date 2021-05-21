import fa from "@/utils/fa";
export default {
    async settingInfo(data = {}) {
        return fa.request({
            url: `/admin/alipay/settingInfo`,
            method: "GET",
            data
        });
    },
    async settingEdit(data = {}) {
        return fa.request({
            url: `/admin/alipay/settingEdit`,
            method: "POST",
            data
        });
    },
};
