import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/admin/image/list`,
            method: "GET",
            data
        });
    },
    async goodsImageList(data = {}) {
        return fa.request({
            url: `/admin/image/goodsImageList`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `/admin/image/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return fa.request({
            url: `/admin/image/edit`,
            method: "POST",
            data
        });
    },
    async del(data = {}) {
        return fa.request({
            url: `/admin/image/del`,
            method: "POST",
            data
        });
    },
    async move(data = {}) {
        return fa.request({
            url: `/admin/image/move`,
            method: "POST",
            data
        });
    },
    async folderList(data = {}) {
        return fa.request({
            url: `/admin/imagefolder/list`,
            method: "GET",
            data
        });
    },
    async folderInfo(data = {}) {
        return fa.request({
            url: `/admin/imagefolder/info`,
            method: "GET",
            data
        });
    },
    async folderAdd(data = {}) {
        return fa.request({
            url: `/admin/imagefolder/add`,
            method: "POST",
            data
        });
    },
    async folderEdit(data = {}) {
        return fa.request({
            url: `/admin/imagefolder/edit`,
            method: "POST",
            data
        });
    },
    async folderDel(data = {}) {
        return fa.request({
            url: `/admin/imagefolder/del`,
            method: "POST",
            data
        });
    },
    async folderMove(data = {}) {
        return fa.request({
            url: `/admin/imagefolder/move`,
            method: "POST",
            data
        });
    }
};
