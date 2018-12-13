import fa from "@/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `goods/list`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `goods/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return fa.request({
            url: `goods/edit`,
            method: "POST",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `goods/info`,
            method: "GET",
            data
        });
    },
    async del(data = {}) {
        return fa.request({
            url: `goods/del`,
            method: "POST",
            data
        });
    },
    async offSale(data = {}) {
        return fa.request({
            url: `goods/offSale`,
            method: "POST",
            data
        });
    },
    async onSale(data = {}) {
        return fa.request({
            url: `goods/onSale`,
            method: "POST",
            data
        });
    },
    async batchUpshelf(data = {}) {
        return fa.request({
            url: `goods/batchUpshelf`,
            method: "POST",
            data
        });

    },
    async batchDownshelf(data = {}) {
        return fa.request({
            url: `goods/batchDownshelf`,
            method: "POST",
            data
        });

    },
    spec: {
        async list(data = {}) {
            return fa.request({
                url: `goodsspec/list`,
                method: "GET",
                data
            });
        },
        async add(data = {}) {
            return fa.request({
                url: `goodsspec/add`,
                method: "POST",
                data
            });
        }
    },
    specValue: {
        async del(data = {}) {
            return fa.request({
                url: `goodsspecvalue/del`,
                method: "POST",
                data
            });
        },
        async add(data = {}) {
            return fa.request({
                url: `goodsspecvalue/add`,
                method: "POST",
                data
            });
        }
    },
    category: {
        async list(data = {}) {
            return fa.request({
                url: `goodscategory/list`,
                method: "GET",
                data
            });
        },
        async info(data = {}) {
            return fa.request({
                url: `goodscategory/info`,
                method: "GET",
                data
            });
        },
        async sort(data = {}) {
            return fa.request({
                url: `goodscategory/sort`,
                method: "POST",
                data
            });
        },
        async del(data = {}) {
            return fa.request({
                url: `goodscategory/del`,
                method: "POST",
                data
            });
        }
        ,
        async add(data = {}) {
            return fa.request({
                url: `goodscategory/add`,
                method: "POST",
                data
            });
        }
        ,
        async edit(data = {}) {
            return fa.request({
                url: `goodscategory/edit`,
                method: "POST",
                data
            });
        }
    },
    evaluate: {
        async list(data = {}) {
            return fa.request({
                url: `goodsevaluate/list`,
                method: "GET",
                data
            });
        },
        async reply(data = {}) {
            return fa.request({
                url: `goodsevaluate/reply`,
                method: "POST",
                data
            });
        },
        async display(data = {}) {
            return fa.request({
                url: `goodsevaluate/display`,
                method: "POST",
                data
            });
        }
    }
}
;
