import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/admin/group/list`,
            method: "GET",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/admin/group/info`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `/admin/group/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return fa.request({
            url: `/admin/group/edit`,
            method: "POST",
            data
        });
    },
    async selectableGoods(data = {}) {
        return fa.request({
            url: `/admin/group/selectableGoods`,
            method: "GET",
            data
        });
    },
    async selectedGoods(data = {}) {
        return fa.request({
            url: `/admin/group/selectedGoods`,
            method: "GET",
            data
        });
    },
    async goodsSkuList(data = {}) {
        return fa.request({
            url: `/admin/group/goodsSkuList`,
            method: "GET",
            data
        });
    },
    async showSet(data = {}) {
        return fa.request({
            url: `/admin/group/showSet`,
            method: "POST",
            data
        });
    },
    async del(data = {}) {
        return fa.request({
            url: `/admin/group/del`,
            method: "POST",
            data
        });
    },
    async pageGoods(data = {}) {
        return fa.request({
            url: `/admin/group/pageGoods`,
            method: "GET",
            data
        });
    },
};
