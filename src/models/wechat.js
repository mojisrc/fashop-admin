import wechat from "@/services/wechat";

export default {
    namespace: "wechat",
    state: {
        getConf: {},
        checkApiStatus: {},
        confSet: {},
        menuList: {},
        menuCurrent: {},
        menuCreate: {},
        menuDelete: {},
        autoReplyStatusSet: {},
        autoReplyStatusGet: {},
        autoReplySubscribeGet: {},
        autoReplySubscribeSet: {},
        replyKeywordsList: {},
        autoReplyKeywordsAdd: {},
        autoReplyKeywordsEdit: {},
        autoReplyKeywordsDel: {},
        autoReplyKeywordsInfo: {},
        userList: {},
        userBlackList: {},
        userSelect: {},
        userBlock: {},
        userUnblock: {},
        userRemark: {},
        userTagList: {},
        getToken: {},
        userTagCreate: {},
        userTagUpdate: {},
        userTagDelete: {},
        userTagsByOpenid: {},
        userTagUsersOfTag: {},
        userTagTagUsers: {},
        userTagUntagUsers: {},
        broadcastRecords: {},
        broadcastUserSearch: {},
        broadcastCreate: {},
        broadcastSurplus: {},
        broadcastRecordsDel: {},
        wechatMaterialList: {},
        materialUploadThumb: {},
        materialUploadArticle: {},
        materialUpdateArticle: {},
        materialGet: {},
        materialUploadArticleImage: {},
        materialUploadImage: {},
        materialUploadVoice: {},
        materialUploadVideo: {},
        localNews: {},
        localNewsInfo: {},
        localNewsAdd: {},
        localNewsEdit: {},
        localNewsDel: {},
        materialDelete: {}
    },
    effects: {
        * getConf({ payload, callback }, { call, put }) {
            const response = yield call(wechat.getConf, payload);
            yield put({
                type: "getConf",
                payload: response
            });
            if (callback) callback(response);
        },
        * checkApiStatus({ payload, callback }, { call, put }) {
            const response = yield call(wechat.checkApiStatus, payload);
            yield put({
                type: "checkApiStatus",
                payload: response
            });
            if (callback) callback(response);
        },
        * confSet({ payload, callback }, { call, put }) {
            const response = yield call(wechat.confSet, payload);
            yield put({
                type: "confSet",
                payload: response
            });
            if (callback) callback(response);
        },
        * menuList({ payload, callback }, { call, put }) {
            const response = yield call(wechat.confSet, payload);
            yield put({
                type: "confSet",
                payload: response
            });
            if (callback) callback(response);
        },
        * menuCurrent({ payload, callback }, { call, put }) {
            const response = yield call(wechat.menuCurrent, payload);
            yield put({
                type: "menuCurrent",
                payload: response
            });
            if (callback) callback(response);
        },
        * menuCreate({ payload, callback }, { call, put }) {
            const response = yield call(wechat.menuCreate, payload);
            yield put({
                type: "menuCreate",
                payload: response
            });
            if (callback) callback(response);
        },
        * menuDelete({ payload, callback }, { call, put }) {
            const response = yield call(wechat.menuDelete, payload);
            yield put({
                type: "menuDelete",
                payload: response
            });
            if (callback) callback(response);
        },
        * autoReplyStatusSet({ payload, callback }, { call, put }) {
            const response = yield call(wechat.autoReplyStatusSet, payload);
            yield put({
                type: "autoReplyStatusSet",
                payload: response
            });
            if (callback) callback(response);
        },
        * autoReplyStatusGet({ payload, callback }, { call, put }) {
            const response = yield call(wechat.autoReplyStatusGet, payload);
            yield put({
                type: "autoReplyStatusGet",
                payload: response
            });
            if (callback) callback(response);
        },
        * autoReplySubscribeGet({ payload, callback }, { call, put }) {
            const response = yield call(wechat.autoReplySubscribeGet, payload);
            yield put({
                type: "autoReplySubscribeGet",
                payload: response
            });
            if (callback) callback(response);
        },
        * autoReplySubscribeSet({ payload, callback }, { call, put }) {
            const response = yield call(wechat.autoReplySubscribeSet, payload);
            yield put({
                type: "autoReplySubscribeSet",
                payload: response
            });
            if (callback) callback(response);
        },
        * replyKeywordsList({ payload, callback }, { call, put }) {
            const response = yield call(wechat.replyKeywordsList, payload);
            yield put({
                type: "replyKeywordsList",
                payload: response
            });
            if (callback) callback(response);
        },
        * autoReplyKeywordsAdd({ payload, callback }, { call, put }) {
            const response = yield call(wechat.autoReplyKeywordsAdd, payload);
            yield put({
                type: "autoReplyKeywordsAdd",
                payload: response
            });
            if (callback) callback(response);
        },
        * autoReplyKeywordsEdit({ payload, callback }, { call, put }) {
            const response = yield call(wechat.autoReplyKeywordsEdit, payload);
            yield put({
                type: "autoReplyKeywordsEdit",
                payload: response
            });
            if (callback) callback(response);
        },
        * autoReplyKeywordsDel({ payload, callback }, { call, put }) {
            const response = yield call(wechat.autoReplyKeywordsDel, payload);
            yield put({
                type: "autoReplyKeywordsDel",
                payload: response
            });
            if (callback) callback(response);
        },
        * autoReplyKeywordsInfo({ payload, callback }, { call, put }) {
            const response = yield call(wechat.autoReplyKeywordsInfo, payload);
            yield put({
                type: "autoReplyKeywordsInfo",
                payload: response
            });
            if (callback) callback(response);
        },
        * userList({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userList, payload);
            yield put({
                type: "userList",
                payload: response
            });
            if (callback) callback(response);
        },
        * userBlackList({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userBlackList, payload);
            yield put({
                type: "userBlackList",
                payload: response
            });
            if (callback) callback(response);
        },
        * userSelect({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userSelect, payload);
            yield put({
                type: "userSelect",
                payload: response
            });
            if (callback) callback(response);
        },
        * userBlock({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userBlock, payload);
            yield put({
                type: "userBlock",
                payload: response
            });
            if (callback) callback(response);
        },
        * userUnblock({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userUnblock, payload);
            yield put({
                type: "userUnblock",
                payload: response
            });
            if (callback) callback(response);
        },
        * userRemark({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userRemark, payload);
            yield put({
                type: "userRemark",
                payload: response
            });
            if (callback) callback(response);
        },
        * userTagList({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userTagList, payload);
            yield put({
                type: "userTagList",
                payload: response
            });
            if (callback) callback(response);
        },
        * getToken({ payload, callback }, { call, put }) {
            const response = yield call(wechat.getToken, payload);
            yield put({
                type: "getToken",
                payload: response
            });
            if (callback) callback(response);
        },
        * userTagCreate({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userTagCreate, payload);
            yield put({
                type: "userTagCreate",
                payload: response
            });
            if (callback) callback(response);
        },
        * userTagUpdate({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userTagUpdate, payload);
            yield put({
                type: "userTagUpdate",
                payload: response
            });
            if (callback) callback(response);
        },
        * userTagDelete({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userTagDelete, payload);
            yield put({
                type: "userTagDelete",
                payload: response
            });
            if (callback) callback(response);
        },
        * userTagsByOpenid({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userTagsByOpenid, payload);
            yield put({
                type: "userTagsByOpenid",
                payload: response
            });
            if (callback) callback(response);
        },
        * userTagUsersOfTag({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userTagUsersOfTag, payload);
            yield put({
                type: "userTagUsersOfTag",
                payload: response
            });
            if (callback) callback(response);
        },
        * userTagTagUsers({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userTagTagUsers, payload);
            yield put({
                type: "userTagTagUsers",
                payload: response
            });
            if (callback) callback(response);
        },
        * userTagUntagUsers({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userTagUntagUsers, payload);
            yield put({
                type: "userTagUntagUsers",
                payload: response
            });
            if (callback) callback(response);
        },
        * broadcastRecords({ payload, callback }, { call, put }) {
            const response = yield call(wechat.broadcastRecords, payload);
            yield put({
                type: "broadcastRecords",
                payload: response
            });
            if (callback) callback(response);
        },
        * broadcastUserSearch({ payload, callback }, { call, put }) {
            const response = yield call(wechat.broadcastUserSearch, payload);
            yield put({
                type: "broadcastUserSearch",
                payload: response
            });
            if (callback) callback(response);
        },
        * broadcastCreate({ payload, callback }, { call, put }) {
            const response = yield call(wechat.broadcastCreate, payload);
            yield put({
                type: "broadcastCreate",
                payload: response
            });
            if (callback) callback(response);
        },
        * broadcastSurplus({ payload, callback }, { call, put }) {
            const response = yield call(wechat.broadcastSurplus, payload);
            yield put({
                type: "broadcastSurplus",
                payload: response
            });
            if (callback) callback(response);
        },
        * broadcastRecordsDel({ payload, callback }, { call, put }) {
            const response = yield call(wechat.broadcastRecordsDel, payload);
            yield put({
                type: "broadcastRecordsDel",
                payload: response
            });
            if (callback) callback(response);
        },
        * wechatMaterialList({ payload, callback }, { call, put }) {
            const response = yield call(wechat.wechatMaterialList, payload);
            yield put({
                type: "list",
                payload: response
            });
            if (callback) callback(response);
        },
        * materialUploadThumb({ payload, callback }, { call, put }) {
            const response = yield call(wechat.materialUploadThumb, payload);
            yield put({
                type: "materialUploadThumb",
                payload: response
            });
            if (callback) callback(response);
        },
        * materialUploadArticle({ payload, callback }, { call, put }) {
            const response = yield call(wechat.materialUploadArticle, payload);
            yield put({
                type: "materialUploadArticle",
                payload: response
            });
            if (callback) callback(response);
        },
        * materialUpdateArticle({ payload, callback }, { call, put }) {
            const response = yield call(wechat.materialUpdateArticle, payload);
            yield put({
                type: "materialUpdateArticle",
                payload: response
            });
            if (callback) callback(response);
        },
        * materialGet({ payload, callback }, { call, put }) {
            const response = yield call(wechat.materialGet, payload);
            yield put({
                type: "materialGet",
                payload: response
            });
            if (callback) callback(response);
        },
        * materialUploadArticleImage({ payload, callback }, { call, put }) {
            const response = yield call(wechat.materialUploadArticleImage, payload);
            yield put({
                type: "materialUploadArticleImage",
                payload: response
            });
            if (callback) callback(response);
        },
        * materialUploadImage({ payload, callback }, { call, put }) {
            const response = yield call(wechat.materialUploadImage, payload);
            yield put({
                type: "materialUploadImage",
                payload: response
            });
            if (callback) callback(response);
        },
        * materialUploadVoice({ payload, callback }, { call, put }) {
            const response = yield call(wechat.materialUploadVoice, payload);
            yield put({
                type: "materialUploadVoice",
                payload: response
            });
            if (callback) callback(response);
        },
        * materialUploadVideo({ payload, callback }, { call, put }) {
            const response = yield call(wechat.materialUploadVideo, payload);
            yield put({
                type: "materialUploadVideo",
                payload: response
            });
            if (callback) callback(response);
        },
        * localNews({ payload, callback }, { call, put }) {
            const response = yield call(wechat.localNews, payload);
            yield put({
                type: "localNews",
                payload: response
            });
            if (callback) callback(response);
        },
        * localNewsInfo({ payload, callback }, { call, put }) {
            const response = yield call(wechat.localNewsInfo, payload);
            yield put({
                type: "localNewsInfo",
                payload: response
            });
            if (callback) callback(response);
        },
        * localNewsAdd({ payload, callback }, { call, put }) {
            const response = yield call(wechat.localNewsAdd, payload);
            yield put({
                type: "localNewsAdd",
                payload: response
            });
            if (callback) callback(response);
        },
        * localNewsEdit({ payload, callback }, { call, put }) {
            const response = yield call(wechat.localNewsEdit, payload);
            yield put({
                type: "localNewsEdit",
                payload: response
            });
            if (callback) callback(response);
        },
        * localNewsDel({ payload, callback }, { call, put }) {
            const response = yield call(wechat.localNewsDel, payload);
            yield put({
                type: "localNewsDel",
                payload: response
            });
            if (callback) callback(response);
        },
        * materialDelete({ payload, callback }, { call, put }) {
            const response = yield call(wechat.materialDelete, payload);
            yield put({
                type: "materialDelete",
                payload: response
            });
            if (callback) callback(response);
        }
    },
    reducers: {
        getConf(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        checkApiStatus(state, action) {
            return {
                ...state,
                getConf: action.payload
            };
        },
        confSet(state, action) {
            return {
                ...state,
                confSet: action.payload
            };
        },
        menuList(state, action) {
            return {
                ...state,
                menuList: action.payload
            };
        },
        menuCurrent(state, action) {
            return {
                ...state,
                menuCurrent: action.payload
            };
        },
        menuCreate(state, action) {
            return {
                ...state,
                menuCreate: action.payload
            };
        },
        menuDelete(state, action) {
            return {
                ...state,
                menuDelete: action.payload
            };
        },
        autoReplyStatusSet(state, action) {
            return {
                ...state,
                autoReplyStatusSet: action.payload
            };
        },
        autoReplyStatusGet(state, action) {
            return {
                ...state,
                autoReplyStatusGet: action.payload
            };
        },
        autoReplySubscribeGet(state, action) {
            return {
                ...state,
                autoReplySubscribeGet: action.payload
            };
        },
        autoReplySubscribeSet(state, action) {
            return {
                ...state,
                autoReplySubscribeSet: action.payload
            };
        },
        replyKeywordsList(state, action) {
            return {
                ...state,
                replyKeywordsList: action.payload
            };
        },
        autoReplyKeywordsAdd(state, action) {
            return {
                ...state,
                autoReplyKeywordsAdd: action.payload
            };
        },
        autoReplyKeywordsEdit(state, action) {
            return {
                ...state,
                autoReplyKeywordsEdit: action.payload
            };
        },
        autoReplyKeywordsDel(state, action) {
            return {
                ...state,
                autoReplyKeywordsDel: action.payload
            };
        },
        autoReplyKeywordsInfo(state, action) {
            return {
                ...state,
                autoReplyKeywordsInfo: action.payload
            };
        },
        userList(state, action) {
            return {
                ...state,
                userList: action.payload
            };
        },
        userBlackList(state, action) {
            return {
                ...state,
                userBlackList: action.payload
            };
        },
        userSelect(state, action) {
            return {
                ...state,
                userSelect: action.payload
            };
        },
        userBlock(state, action) {
            return {
                ...state,
                userBlock: action.payload
            };
        },
        userUnblock(state, action) {
            return {
                ...state,
                userUnblock: action.payload
            };
        },
        userRemark(state, action) {
            return {
                ...state,
                userRemark: action.payload
            };
        },
        userTagList(state, action) {
            return {
                ...state,
                userTagList: action.payload
            };
        },
        getToken(state, action) {
            return {
                ...state,
                getToken: action.payload
            };
        },
        userTagCreate(state, action) {
            return {
                ...state,
                userTagCreate: action.payload
            };
        },
        userTagUpdate(state, action) {
            return {
                ...state,
                userTagUpdate: action.payload
            };
        },
        userTagDelete(state, action) {
            return {
                ...state,
                userTagDelete: action.payload
            };
        },
        userTagsByOpenid(state, action) {
            return {
                ...state,
                userTagsByOpenid: action.payload
            };
        },
        userTagUsersOfTag(state, action) {
            return {
                ...state,
                userTagUsersOfTag: action.payload
            };
        },
        userTagTagUsers(state, action) {
            return {
                ...state,
                userTagTagUsers: action.payload
            };
        },
        userTagUntagUsers(state, action) {
            return {
                ...state,
                userTagUntagUsers: action.payload
            };
        },
        broadcastRecords(state, action) {
            return {
                ...state,
                broadcastRecords: action.payload
            };
        },
        broadcastUserSearch(state, action) {
            return {
                ...state,
                broadcastUserSearch: action.payload
            };
        },
        broadcastCreate(state, action) {
            return {
                ...state,
                broadcastCreate: action.payload
            };
        },
        broadcastSurplus(state, action) {
            return {
                ...state,
                broadcastSurplus: action.payload
            };
        },
        broadcastRecordsDel(state, action) {
            return {
                ...state,
                broadcastRecordsDel: action.payload
            };
        },
        wechatMaterialList(state, action) {
            return {
                ...state,
                wechatMaterialList: action.payload
            };
        },
        materialUploadThumb(state, action) {
            return {
                ...state,
                materialUploadThumb: action.payload
            };
        },
        materialUploadArticle(state, action) {
            return {
                ...state,
                materialUploadArticle: action.payload
            };
        },
        materialUpdateArticle(state, action) {
            return {
                ...state,
                materialUpdateArticle: action.payload
            };
        },
        materialGet(state, action) {
            return {
                ...state,
                materialGet: action.payload
            };
        },
        materialUploadArticleImage(state, action) {
            return {
                ...state,
                materialUploadArticleImage: action.payload
            };
        },
        materialUploadImage(state, action) {
            return {
                ...state,
                materialUploadImage: action.payload
            };
        },
        materialUploadVoice(state, action) {
            return {
                ...state,
                materialUploadVoice: action.payload
            };
        },
        materialUploadVideo(state, action) {
            return {
                ...state,
                materialUploadVideo: action.payload
            };
        },
        localNews(state, action) {
            return {
                ...state,
                localNews: action.payload
            };
        },
        localNewsInfo(state, action) {
            return {
                ...state,
                localNewsInfo: action.payload
            };
        },
        localNewsAdd(state, action) {
            return {
                ...state,
                localNewsAdd: action.payload
            };
        },
        localNewsEdit(state, action) {
            return {
                ...state,
                localNewsEdit: action.payload
            };
        },
        localNewsDel(state, action) {
            return {
                ...state,
                localNewsDel: action.payload
            };
        },
        materialDelete(state, action) {
            return {
                ...state,
                materialDelete: action.payload
            };
        }
    }
};
