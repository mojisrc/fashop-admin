import fa from "@/fa";

export default {
    async quantity(data = {}) {
        return fa.request({
            url: `Statistics/quantity`,
            method: "GET",
            data
        });
    },
    async monthSalesHistogram(data = {}) {
        return fa.request({
            url: `Statistics/monthSalesHistogram`,
            method: "GET",
            data
        });
    },
    async monthOrderCountHistogram(data = {}) {
        return fa.request({
            url: `Statistics/monthOrderCountHistogram`,
            method: "GET",
            data
        });
    },
    async monthUserAddCountHistogram(data = {}) {
        return fa.request({
            url: `Statistics/monthUserAddCountHistogram`,
            method: "GET",
            data
        });
    },
    async monthNewUserSalesHistogram(data = {}) {
        return fa.request({
            url: `Statistics/monthNewUserSalesHistogram`,
            method: "GET",
            data
        });
    },
    async saleAccumulativeAmount(data = {}) {
        return fa.request({
            url: `Statistics/saleAccumulativeAmount`,
            method: "GET",
            data
        });
    },
    async dayAverage(data = {}) {
        return fa.request({
            url: `Statistics/dayAverage`,
            method: "GET",
            data
        });
    }
};
