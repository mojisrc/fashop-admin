import fa from "@/fa";

export default {
    async addImage(data = {}) {
        return await fa.request({
            url: `Upload/addImage`,
            method: "POST",
            data
        });
    },
    async addCert(data = {}) {
        return await fa.request({
            url: `Upload/addCert`,
            method: "POST",
            data
        });
    }
};
