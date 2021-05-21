import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/admin/coupon/list`,
            method: "GET",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/admin/coupon/info`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `/admin/coupon/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return fa.request({
            url: `/admin/coupon/edit`,
            method: "POST",
            data
        });
    },
    async cancel(data = {}) {
        return fa.request({
            url: `/admin/coupon/cancel`,
            method: "POST",
            data
        });
    },
    // 优惠券领取记录
    async goodsList(data = {}) {
        return fa.request({
            url: `/admin/coupon/goodsList`,
            method: "GET",
            data
        });
    },
    // 领取优惠券的人  todo
    async users(data = {}) {
        return fa.request({
            url: `/admin/coupon/users`,
            method: "GET",
            data
        });
    },
    /*
     *  优惠券列表[装修使用]
     *  已过滤掉了抢完的 是过了使用期的
     */
    async pageCoupons(data = {}) {
        return fa.request({
            url: `/admin/coupon/pageCoupons`,
            method: "GET",
            data
        });
    },

    async del(data = {}) {
        return fa.request({
            url: `/admin/coupon/del`,
            method: "POST",
            data
        });
    },
    async selectableUsers(data = {}) {
        return fa.request({
            url: `/admin/coupon/selectableUsers`,
            method: "GET",
            data
        });
    },
    async give(data = {}) {
        return fa.request({
            url: `/admin/coupon/give`,
            method: "POST",
            data
        });
    }
};
