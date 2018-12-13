import fa from "@/fa";

export default {
    async list(data = {}) {
        return await fa.request({
            url: `order/list`,
            method: "GET",
            data
        });
    },
    async info(data = {}) {
        return await fa.request({
            url: `order/info`,
            method: "GET",
            data
        });
    },
    async setSend(data = {}) {
        return await fa.request({
            url: `order/setSend`,
            method: "POST",
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
    refund: {
        async list(data = {}) {
            return await fa.request({
                url: `orderrefund/list`,
                method: "GET",
                data
            });
        },
        async info(data = {}) {
            return await fa.request({
                url: `orderrefund/info`,
                method: "GET",
                data
            });
        },
        async handle(data = {}) {
            return await fa.request({
                url: `orderrefund/handle`,
                method: "POST",
                data
            });
        },
        async receive(data = {}) {
            return await fa.request({
                url: `orderrefund/receive`,
                method: "POST",
                data
            });
        }
    }
};
