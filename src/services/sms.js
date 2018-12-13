import fa from "@/fa";

export default {
    provider: {
        async edit(data = {}) {
            return await fa.request({
                url: `Smsprovider/edit`,
                method: "POST",
                data
            });
        }
    },
    scene: {
        async edit(data = {}) {
            return await fa.request({
                url: `Smsscene/edit`,
                method: "POST",
                data
            });

        },
        async info(data = {}) {
            return await fa.request({
                url: `Smsscene/info`,
                method: "GET",
                data
            });

        },
        async list(data = {}) {
            return await fa.request({
                url: `Smsscene/list`,
                method: "GET",
                data
            });
        },
        async add(data = {}) {
            return await fa.request({
                url: `goods/add`,
                method: "POST",
                data
            });
        }
    }
};
