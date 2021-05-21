import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/admin/goodsmedia/list`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `/admin/goodsmedia/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return fa.request({
            url: `/admin/goodsmedia/edit`,
            method: "POST",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/admin/goodsmedia/info`,
            method: "GET",
            data
        });
    },
    async del(data = {}) {
        return fa.request({
            url: `/admin/goodsmedia/del`,
            method: "POST",
            data
        });
    },
}
;
