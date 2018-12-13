import fa from "@/fa";

export default {
    async info(data = {}) {
        return await fa.request({
            url: `shop/info`,
            method: "GET",
            data
        });
    },
    async setOrderExpires(data = {}) {
        return await fa.request({
            url: `shop/setOrderExpires`,
            method: "POST",
            data
        });
    },
    async setBaseInfo(data = {}) {
        return await fa.request({
            url: `shop/setBaseInfo`,
            method: "POST",
            data
        });
    },
    async setGoodsCategoryStyle(data = {}) {
        return await fa.request({
            url: `shop/setGoodsCategoryStyle`,
            method: "POST",
            data
        });
    },
    async setColorScheme(data = {}) {
        return await fa.request({
            url: `shop/setColorScheme`,
            method: "POST",
            data
        });
    },
    async setPortalTemplate(data = {}) {
        return await fa.request({
            url: `shop/setPortalTemplate`,
            method: "POST",
            data
        });
    }
};
