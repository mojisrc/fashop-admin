import fa from "@/utils/fa";

export default {
    provider: {
        async edit(data = {}) {
            return fa.request({
                url: `/admin/Smsprovider/edit`,
                method: "POST",
                data
            });
        }
    },
    scene: {
        async edit(data = {}) {
            return fa.request({
                url: `/admin/Smsscene/edit`,
                method: "POST",
                data
            });

        },
        async info(data = {}) {
            return fa.request({
                url: `/admin/Smsscene/info`,
                method: "GET",
                data
            });

        },
        async list(data = {}) {
            return fa.request({
                url: `/admin/Smsscene/list`,
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
        }
    }
};
