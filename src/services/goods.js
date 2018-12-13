import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/admin/goods/list`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `/admin/goods/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return fa.request({
            url: `/admin/goods/edit`,
            method: "POST",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/admin/goods/info`,
            method: "GET",
            data
        });
    },
    async del(data = {}) {
        return fa.request({
            url: `/admin/goods/del`,
            method: "POST",
            data
        });
    },
    async offSale(data = {}) {
        return fa.request({
            url: `/admin/goods/offSale`,
            method: "POST",
            data
        });
    },
    async onSale(data = {}) {
        return fa.request({
            url: `/admin/goods/onSale`,
            method: "POST",
            data
        });
    },
    async batchUpshelf(data = {}) {
        return fa.request({
            url: `/admin/goods/batchUpshelf`,
            method: "POST",
            data
        });

    },
    async batchDownshelf(data = {}) {
        return fa.request({
            url: `/admin/goods/batchDownshelf`,
            method: "POST",
            data
        });

    },
    spec: {
        async list(data = {}) {
            return fa.request({
                url: `/admin/goodsspec/list`,
                method: "GET",
                data
            });
        },
        async add(data = {}) {
            return fa.request({
                url: `/admin/goodsspec/add`,
                method: "POST",
                data
            });
        },
        async edit(data = {}) {
            return fa.request({
                url: `/admin/goodsspec/edit`,
                method: "POST",
                data
            });
        }
    },
    specValue: {
        async list(data = {}) {
            return fa.request({
                url: `/admin/goodsspecvalue/list`,
                method: "POST",
                data
            });
        },
        async del(data = {}) {
            return fa.request({
                url: `/admin/goodsspecvalue/del`,
                method: "POST",
                data
            });
        },
        async add(data = {}) {
            return fa.request({
                url: `/admin/goodsspecvalue/add`,
                method: "POST",
                data
            });
        }
    },
    category: {
        async list(data = {}) {
            return fa.request({
                url: `/admin/goodscategory/list`,
                method: "GET",
                data
            });
        },
        async info(data = {}) {
            return fa.request({
                url: `/admin/goodscategory/info`,
                method: "GET",
                data
            });
        },
        async sort(data = {}) {
            return fa.request({
                url: `/admin/goodscategory/sort`,
                method: "POST",
                data
            });
        },
        async del(data = {}) {
            return fa.request({
                url: `/admin/goodscategory/del`,
                method: "POST",
                data
            });
        }
        ,
        async add(data = {}) {
            return fa.request({
                url: `/admin/goodscategory/add`,
                method: "POST",
                data
            });
        }
        ,
        async edit(data = {}) {
            return fa.request({
                url: `/admin/goodscategory/edit`,
                method: "POST",
                data
            });
        }
    },
    evaluate: {
        async list(data = {}) {
            return fa.request({
                url: `/admin/goodsevaluate/list`,
                method: "GET",
                data
            });
        },
        async reply(data = {}) {
            return fa.request({
                url: `/admin/goodsevaluate/reply`,
                method: "POST",
                data
            });
        },
        async display(data = {}) {
            return fa.request({
                url: `/admin/goodsevaluate/display`,
                method: "POST",
                data
            });
        }
    }
}
;
