import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/admin/goodsrelation/list`,
            method: "GET",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/admin/goodsrelation/info`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `/admin/goodsrelation/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return fa.request({
            url: `/admin/goodsrelation/edit`,
            method: "POST",
            data
        });
    },
    async del(data = {}) {
        return fa.request({
            url: `/admin/goodsrelation/del`,
            method: "POST",
            data
        });
    },
    async goodsList(data = {}) {
        return fa.request({
            url: `/admin/goodsrelation/goodsList`,
            method: "GET",
            data
        });
    },
    async pageGoodsRelationList(data = {}) {
        return fa.request({
            url: `/admin/goodsrelation/pageGoodsRelationList`,
            method: "GET",
            data
        });
    },

};
