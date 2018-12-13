import fa from "@/fa";

export default {
    async info(data = {}) {
        return fa.request({
            url: `shop/info`,
            method: "GET",
            data
        });
    },
    async setOrderExpires(data = {}) {
        return fa.request({
            url: `shop/setOrderExpires`,
            method: "POST",
            data
        });
    },
    async setBaseInfo(data = {}) {
        return fa.request({
            url: `shop/setBaseInfo`,
            method: "POST",
            data
        });
    },
    async setGoodsCategoryStyle(data = {}) {
        return fa.request({
            url: `shop/setGoodsCategoryStyle`,
            method: "POST",
            data
        });
    },
    async setColorScheme(data = {}) {
        return fa.request({
            url: `shop/setColorScheme`,
            method: "POST",
            data
        });
    },
    async setPortalTemplate(data = {}) {
        return fa.request({
            url: `shop/setPortalTemplate`,
            method: "POST",
            data
        });
    }
};
