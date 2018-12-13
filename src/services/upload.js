import fa from "@/utils/fa";

export default {
    async addImage(data = {}) {
        return fa.request({
            url: `Upload/addImage`,
            method: "POST",
            data
        });
    },
    async addCert(data = {}) {
        return fa.request({
            url: `Upload/addCert`,
            method: "POST",
            data
        });
    }
};
