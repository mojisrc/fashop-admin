import fa from "@/utils/fa";

export default {
    async addImage(data = {}) {
        return fa.request({
            url: `/admin/Upload/addImage`,
            method: "POST",
            data
        });
    },
    async addCert(data = {}) {
        return fa.request({
            url: `/admin/Upload/addCert`,
            method: "POST",
            data
        });
    }
};
