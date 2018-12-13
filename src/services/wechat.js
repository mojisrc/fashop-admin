import fa from "@/fa";
export default {
    async getConf(data = {}) {
        return await fa.request({
            url: `wechat/getConf`,
            method: "GET",
            data
        });
    },
    async checkApiStatus(data = {}) {
        return await fa.request({
            url: `wechat/checkApiStatus`,
            method: "GET",
            data
        });
    },
    async confSet(data = {}) {
        return await fa.request({
            url: `wechat/confSet`,
            method: "POST",
            data
        });
    },
    async menuList(data = {}) {
        return await fa.request({
            url: `wechat/menuList`,
            method: "POST",
            data
        });
    },
    async menuCurrent(data = {}) {
        return await fa.request({
            url: `wechat/menuCurrent`,
            method: "POST",
            data
        });
    },
    async menuCreate(data = {}) {
        return await fa.request({
            url: `wechat/menuCreate`,
            method: "POST",
            data
        });
    },
    async menuDelete(data = {}) {
        return await fa.request({
            url: `wechat/menuDelete`,
            method: "POST",
            data
        });
    },
    async autoReplyStatusSet(data = {}) {
        return await fa.request({
            url: `wechat/autoReplyStatusSet`,
            method: "POST",
            data
        });
    },
    async autoReplyStatusGet(data = {}) {
        return await fa.request({
            url: `wechat/autoReplyStatusGet`,
            method: "GET",
            data
        });
    },
    async autoReplySubscribeGet(data = {}) {
        return await fa.request({
            url: `wechat/autoReplySubscribeGet`,
            method: "GET",
            data
        });
    },
    async autoReplySubscribeSet(data = {}) {
        return await fa.request({
            url: `wechat/autoReplySubscribeSet`,
            method: "POST",
            data
        });
    },
    async replyKeywordsList(data = {}) {
        return await fa.request({
            url: `wechat/replyKeywordsList`,
            method: "GET",
            data
        });
    },
    async autoReplyKeywordsAdd(data = {}) {
        return await fa.request({
            url: `wechat/autoReplyKeywordsAdd`,
            method: "POST",
            data
        });
    },
    async autoReplyKeywordsEdit(data = {}) {
        return await fa.request({
            url: `wechat/autoReplyKeywordsEdit`,
            method: "POST",
            data
        });
    },
    async autoReplyKeywordsDel(data = {}) {
        return await fa.request({
            url: `wechat/autoReplyKeywordsDel`,
            method: "POST",
            data
        });
    },
    async autoReplyKeywordsInfo(data = {}) {
        return await fa.request({
            url: `wechat/autoReplyKeywordsInfo`,
            method: "GET",
            data
        });
    },
    async userList(data = {}) {
        return await fa.request({
            url: `wechat/userList`,
            method: "GET",
            data
        });
    },
    async userBlackList(data = {}) {
        return await fa.request({
            url: `wechat/userBlackList`,
            method: "GET",
            data
        });
    },
    async userSelect(data = {}) {
        return await fa.request({
            url: `wechat/userSelect`,
            method: "POST",
            data
        });
    },
    async userBlock(data = {}) {
        return await fa.request({
            url: `wechat/userBlock`,
            method: "POST",
            data
        });
    },
    async userUnblock(data = {}) {
        return await fa.request({
            url: `wechat/userUnblock`,
            method: "POST",
            data
        });
    },
    async userRemark(data = {}) {
        return await fa.request({
            url: `wechat/userRemark`,
            method: "POST",
            data
        });
    },
    async userTagList(data = {}) {
        return await fa.request({
            url: `wechat/userTagList`,
            method: "GET",
            data
        });
    },
    async getToken(data = {}) {
        return await fa.request({
            url: `wechat/getToken`,
            method: "GET",
            data
        });
    },
    async userTagCreate(data = {}) {
        return await fa.request({
            url: `wechat/userTagCreate`,
            method: "POST",
            data
        });
    },
    async userTagUpdate(data = {}) {
        return await fa.request({
            url: `wechat/userTagUpdate`,
            method: "POST",
            data
        });
    },
    async userTagDelete(data = {}) {
        return await fa.request({
            url: `wechat/userTagDelete`,
            method: "POST",
            data
        });
    },
    async userTagsByOpenid(data = {}) {
        return await fa.request({
            url: `wechat/userTagsByOpenid`,
            method: "GET",
            data
        });
    },
    async userTagUsersOfTag(data = {}) {
        return await fa.request({
            url: `wechat/userTagUsersOfTag`,
            method: "GET",
            data
        });
    },
    async userTagTagUsers(data = {}) {
        return await fa.request({
            url: `wechat/userTagTagUsers`,
            method: "POST",
            data
        });
    },
    async userTagUntagUsers(data = {}) {
        return await fa.request({
            url: `wechat/userTagUntagUsers`,
            method: "POST",
            data
        });
    },
    async broadcastRecords(data = {}) {
        return await fa.request({
            url: `wechat/broadcastRecords`,
            method: "GET",
            data
        });
    },
    async broadcastUserSearch(data = {}) {
        return await fa.request({
            url: `wechat/broadcastUserSearch`,
            method: "POST",
            data
        });
    },
    async broadcastCreate(data = {}) {
        return await fa.request({
            url: `wechat/broadcastCreate`,
            method: "POST",
            data
        });
    },
    async broadcastSurplus(data = {}) {
        return await fa.request({
            url: `wechat/broadcastSurplus`,
            method: "GET",
            data
        });
    },
    async broadcastRecordsDel(data = {}) {
        return await fa.request({
            url: `wechat/broadcastRecordsDel`,
            method: "POST",
            data
        });
    },
    async wechatMaterialList(data = {}) {
        return await fa.request({
            url: `wechat/wechatMaterialList`,
            method: "GET",
            data
        });
    },
    async materialUploadThumb(data = {}) {
        return await fa.request({
            url: `wechat/materialUploadThumb`,
            method: "POST",
            data
        });


    },
    async materialUploadArticle(data = {}) {
        return await fa.request({
            url: `wechat/materialUploadArticle`,
            method: "POST",
            data
        });

    },
    async materialUpdateArticle(data = {}) {
        return await fa.request({
            url: `wechat/materialUpdateArticle`,
            method: "POST",
            data
        });

    },
    async materialGet(data = {}) {
        return await fa.request({
            url: `wechat/materialGet`,
            method: "GET",
            data
        });

    },
    async materialUploadArticleImage(data = {}) {
        return await fa.request({
            url: `wechat/materialUploadArticleImage`,
            method: "POST",
            data
        });

    },
    async materialUploadImage(data = {}) {
        return await fa.request({
            url: `wechat/materialUploadImage`,
            method: "POST",
            data
        });

    },
    async materialUploadVoice(data = {}) {
        return await fa.request({
            url: `wechat/materialUploadVoice`,
            method: "POST",
            data
        });

    },
    async materialUploadVideo(data = {}) {
        return await fa.request({
            url: `wechat/materialUploadVideo`,
            method: "POST",
            data

        });
    },
    async localNews(data = {}) {
        return await fa.request({
            url: `wechat/localNews`,
            method: "GET",
            data
        });

    },
    async localNewsInfo(data = {}) {
        return await fa.request({
            url: `wechat/localNewsInfo`,
            method: "GET",
            data
        });
    },
    async localNewsAdd(data = {}) {
        return await fa.request({
            url: `wechat/localNewsAdd`,
            method: "POST",
            data
        });
    },
    async localNewsEdit(data = {}) {
        return await fa.request({
            url: `wechat/localNewsEdit`,
            method: "POST",
            data
        });
    },
    async localNewsDel(data = {}) {
        return await fa.request({
            url: `wechat/localNewsDel`,
            method: "POST",
            data

        });
    },
    async materialDelete(data = {}) {
        return await fa.request({
            url: `wechat/materialDelete`,
            method: "POST",
            data
        });
    }
};
