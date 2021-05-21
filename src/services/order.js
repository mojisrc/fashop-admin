import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/admin/order/list`,
            method: "GET",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/admin/order/info`,
            method: "GET",
            data
        });
    },
    async groupInfo(data = {}) {
        return fa.request({
            url: `/admin/order/groupInfo`,
            method: "GET",
            data
        });
    },
    async setSend(data = {}) {
        return fa.request({
            url: `/admin/order/setSend`,
            method: "POST",
            data
        });
    },
    async changePrice(data = {}) {
        return fa.request({
            url: `/admin/order/changePrice`,
            method: "POST",
            data
        });
    },
    async settingInfo(data = {}) {
        return fa.request({
            url: `/admin/order/settingInfo`,
            method: "GET",
            data
        });
    },
    async settingEdit(data = {}) {
        return fa.request({
            url: `/admin/order/settingEdit`,
            method: "POST",
            data
        });
    },
    refund: {
        async list(data = {}) {
            return fa.request({
                url: `/admin/orderrefund/list`,
                method: "GET",
                data
            });
        },
        async info(data = {}) {
            return fa.request({
                url: `/admin/orderrefund/info`,
                method: "GET",
                data
            });
        },
        async handle(data = {}) {
            return fa.request({
                url: `/admin/orderrefund/handle`,
                method: "POST",
                data
            });
        },
        async refund(data = {}) {
            return fa.request({
                url: `/admin/orderrefund/refund`,
                method: "POST",
                data
            });
        },
        async receive(data = {}) {
            return fa.request({
                url: `/admin/orderrefund/receive`,
                method: "POST",
                data
            });
        },
    }
};
