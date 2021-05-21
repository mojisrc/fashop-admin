import fa from "@/utils/fa";

export default {
    async info(data = {}) {
        return fa.request({
            url: `/admin/shop/info`,
            method: "GET",
            data
        });
    },
    async setBaseInfo(data = {}) {
        return fa.request({
            url: `/admin/shop/setBaseInfo`,
            method: "POST",
            data
        });
    },
    async setGoodsCategoryStyle(data = {}) {
        return fa.request({
            url: `/admin/shop/setGoodsCategoryStyle`,
            method: "POST",
            data
        });
    },
    async setColorScheme(data = {}) {
        return fa.request({
            url: `/admin/shop/setColorScheme`,
            method: "POST",
            data
        });
    },
    async setPortalTemplate(data = {}) {
        return fa.request({
            url: `/admin/shop/setPortalTemplate`,
            method: "POST",
            data
        });
    }
};
