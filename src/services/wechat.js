import fa from "@/utils/fa";
export default {
    async getConf(data = {}) {
        return fa.request({
            url: `/admin/wechat/getConf`,
            method: "GET",
            data
        });
    },
    async checkApiStatus(data = {}) {
        return fa.request({
            url: `/admin/wechat/checkApiStatus`,
            method: "GET",
            data
        });
    },
    async confSet(data = {}) {
        return fa.request({
            url: `/admin/wechat/confSet`,
            method: "POST",
            data
        });
    },
    async menuList(data = {}) {
        return fa.request({
            url: `/admin/wechat/menuList`,
            method: "POST",
            data
        });
    },
    async menuCurrent(data = {}) {
        return fa.request({
            url: `/admin/wechat/menuCurrent`,
            method: "POST",
            data
        });
    },
    async menuCreate(data = {}) {
        return fa.request({
            url: `/admin/wechat/menuCreate`,
            method: "POST",
            data
        });
    },
    async menuDelete(data = {}) {
        return fa.request({
            url: `/admin/wechat/menuDelete`,
            method: "POST",
            data
        });
    },
    async autoReplyStatusSet(data = {}) {
        return fa.request({
            url: `/admin/wechat/autoReplyStatusSet`,
            method: "POST",
            data
        });
    },
    async autoReplyStatusGet(data = {}) {
        return fa.request({
            url: `/admin/wechat/autoReplyStatusGet`,
            method: "GET",
            data
        });
    },
    async autoReplySubscribeGet(data = {}) {
        return fa.request({
            url: `/admin/wechat/autoReplySubscribeGet`,
            method: "GET",
            data
        });
    },
    async autoReplySubscribeSet(data = {}) {
        return fa.request({
            url: `/admin/wechat/autoReplySubscribeSet`,
            method: "POST",
            data
        });
    },
    async replyKeywordsList(data = {}) {
        return fa.request({
            url: `/admin/wechat/replyKeywordsList`,
            method: "GET",
            data
        });
    },
    async autoReplyKeywordsAdd(data = {}) {
        return fa.request({
            url: `/admin/wechat/autoReplyKeywordsAdd`,
            method: "POST",
            data
        });
    },
    async autoReplyKeywordsEdit(data = {}) {
        return fa.request({
            url: `/admin/wechat/autoReplyKeywordsEdit`,
            method: "POST",
            data
        });
    },
    async autoReplyKeywordsDel(data = {}) {
        return fa.request({
            url: `/admin/wechat/autoReplyKeywordsDel`,
            method: "POST",
            data
        });
    },
    async autoReplyKeywordsInfo(data = {}) {
        return fa.request({
            url: `/admin/wechat/autoReplyKeywordsInfo`,
            method: "GET",
            data
        });
    },
    async userList(data = {}) {
        return fa.request({
            url: `/admin/wechat/userList`,
            method: "GET",
            data
        });
    },
    async userBlackList(data = {}) {
        return fa.request({
            url: `/admin/wechat/userBlackList`,
            method: "GET",
            data
        });
    },
    async userSelect(data = {}) {
        return fa.request({
            url: `/admin/wechat/userSelect`,
            method: "POST",
            data
        });
    },
    async userBlock(data = {}) {
        return fa.request({
            url: `/admin/wechat/userBlock`,
            method: "POST",
            data
        });
    },
    async userUnblock(data = {}) {
        return fa.request({
            url: `/admin/wechat/userUnblock`,
            method: "POST",
            data
        });
    },
    async userRemark(data = {}) {
        return fa.request({
            url: `/admin/wechat/userRemark`,
            method: "POST",
            data
        });
    },
    async userTagList(data = {}) {
        return fa.request({
            url: `/admin/wechat/userTagList`,
            method: "GET",
            data
        });
    },
    async getToken(data = {}) {
        return fa.request({
            url: `/admin/wechat/getToken`,
            method: "GET",
            data
        });
    },
    async userTagCreate(data = {}) {
        return fa.request({
            url: `/admin/wechat/userTagCreate`,
            method: "POST",
            data
        });
    },
    async userTagUpdate(data = {}) {
        return fa.request({
            url: `/admin/wechat/userTagUpdate`,
            method: "POST",
            data
        });
    },
    async userTagDelete(data = {}) {
        return fa.request({
            url: `/admin/wechat/userTagDelete`,
            method: "POST",
            data
        });
    },
    async userTagsByOpenid(data = {}) {
        return fa.request({
            url: `/admin/wechat/userTagsByOpenid`,
            method: "GET",
            data
        });
    },
    async userTagUsersOfTag(data = {}) {
        return fa.request({
            url: `/admin/wechat/userTagUsersOfTag`,
            method: "GET",
            data
        });
    },
    async userTagTagUsers(data = {}) {
        return fa.request({
            url: `/admin/wechat/userTagTagUsers`,
            method: "POST",
            data
        });
    },
    async userTagUntagUsers(data = {}) {
        return fa.request({
            url: `/admin/wechat/userTagUntagUsers`,
            method: "POST",
            data
        });
    },
    async broadcastRecords(data = {}) {
        return fa.request({
            url: `/admin/wechat/broadcastRecords`,
            method: "GET",
            data
        });
    },
    async broadcastUserSearch(data = {}) {
        return fa.request({
            url: `/admin/wechat/broadcastUserSearch`,
            method: "POST",
            data
        });
    },
    async broadcastCreate(data = {}) {
        return fa.request({
            url: `/admin/wechat/broadcastCreate`,
            method: "POST",
            data
        });
    },
    async broadcastSurplus(data = {}) {
        return fa.request({
            url: `/admin/wechat/broadcastSurplus`,
            method: "GET",
            data
        });
    },
    async broadcastRecordsDel(data = {}) {
        return fa.request({
            url: `/admin/wechat/broadcastRecordsDel`,
            method: "POST",
            data
        });
    },
    async wechatMaterialList(data = {}) {
        return fa.request({
            url: `/admin/wechat/wechatMaterialList`,
            method: "GET",
            data
        });
    },
    async materialUploadThumb(data = {}) {
        return fa.request({
            url: `/admin/wechat/materialUploadThumb`,
            method: "POST",
            data
        });


    },
    async materialUploadArticle(data = {}) {
        return fa.request({
            url: `/admin/wechat/materialUploadArticle`,
            method: "POST",
            data
        });

    },
    async materialUpdateArticle(data = {}) {
        return fa.request({
            url: `/admin/wechat/materialUpdateArticle`,
            method: "POST",
            data
        });

    },
    async materialGet(data = {}) {
        return fa.request({
            url: `/admin/wechat/materialGet`,
            method: "GET",
            data
        });

    },
    async materialUploadArticleImage(data = {}) {
        return fa.request({
            url: `/admin/wechat/materialUploadArticleImage`,
            method: "POST",
            data
        });

    },
    async materialUploadImage(data = {}) {
        return fa.request({
            url: `/admin/wechat/materialUploadImage`,
            method: "POST",
            data
        });

    },
    async materialUploadVoice(data = {}) {
        return fa.request({
            url: `/admin/wechat/materialUploadVoice`,
            method: "POST",
            data
        });

    },
    async materialUploadVideo(data = {}) {
        return fa.request({
            url: `/admin/wechat/materialUploadVideo`,
            method: "POST",
            data

        });
    },
    async localNews(data = {}) {
        return fa.request({
            url: `/admin/wechat/localNews`,
            method: "GET",
            data
        });

    },
    async localNewsInfo(data = {}) {
        return fa.request({
            url: `/admin/wechat/localNewsInfo`,
            method: "GET",
            data
        });
    },
    async localNewsAdd(data = {}) {
        return fa.request({
            url: `/admin/wechat/localNewsAdd`,
            method: "POST",
            data
        });
    },
    async localNewsEdit(data = {}) {
        return fa.request({
            url: `/admin/wechat/localNewsEdit`,
            method: "POST",
            data
        });
    },
    async localNewsDel(data = {}) {
        return fa.request({
            url: `/admin/wechat/localNewsDel`,
            method: "POST",
            data

        });
    },
    async materialDelete(data = {}) {
        return fa.request({
            url: `/admin/wechat/materialDelete`,
            method: "POST",
            data
        });
    }
};
