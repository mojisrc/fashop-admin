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
                type: "_getConf",
                payload: response
            });
            if (callback) callback(response);
        },
        * checkApiStatus({ payload, callback }, { call, put }) {
            const response = yield call(wechat.checkApiStatus, payload);
            yield put({
                type: "_checkApiStatus",
                payload: response
            });
            if (callback) callback(response);
        },
        * confSet({ payload, callback }, { call, put }) {
            const response = yield call(wechat.confSet, payload);
            yield put({
                type: "_confSet",
                payload: response
            });
            if (callback) callback(response);
        },
        * menuList({ payload, callback }, { call, put }) {
            const response = yield call(wechat.confSet, payload);
            yield put({
                type: "_confSet",
                payload: response
            });
            if (callback) callback(response);
        },
        * menuCurrent({ payload, callback }, { call, put }) {
            const response = yield call(wechat.menuCurrent, payload);
            yield put({
                type: "_menuCurrent",
                payload: response
            });
            if (callback) callback(response);
        },
        * menuCreate({ payload, callback }, { call, put }) {
            const response = yield call(wechat.menuCreate, payload);
            yield put({
                type: "_menuCreate",
                payload: response
            });
            if (callback) callback(response);
        },
        * menuDelete({ payload, callback }, { call, put }) {
            const response = yield call(wechat.menuDelete, payload);
            yield put({
                type: "_menuDelete",
                payload: response
            });
            if (callback) callback(response);
        },
        * autoReplyStatusSet({ payload, callback }, { call, put }) {
            const response = yield call(wechat.autoReplyStatusSet, payload);
            yield put({
                type: "_autoReplyStatusSet",
                payload: response
            });
            if (callback) callback(response);
        },
        * autoReplyStatusGet({ payload, callback }, { call, put }) {
            const response = yield call(wechat.autoReplyStatusGet, payload);
            yield put({
                type: "_autoReplyStatusGet",
                payload: response
            });
            if (callback) callback(response);
        },
        * autoReplySubscribeGet({ payload, callback }, { call, put }) {
            const response = yield call(wechat.autoReplySubscribeGet, payload);
            yield put({
                type: "_autoReplySubscribeGet",
                payload: response
            });
            if (callback) callback(response);
        },
        * autoReplySubscribeSet({ payload, callback }, { call, put }) {
            const response = yield call(wechat.autoReplySubscribeSet, payload);
            yield put({
                type: "_autoReplySubscribeSet",
                payload: response
            });
            if (callback) callback(response);
        },
        * replyKeywordsList({ payload, callback }, { call, put }) {
            const response = yield call(wechat.replyKeywordsList, payload);
            yield put({
                type: "_replyKeywordsList",
                payload: response
            });
            if (callback) callback(response);
        },
        * autoReplyKeywordsAdd({ payload, callback }, { call, put }) {
            const response = yield call(wechat.autoReplyKeywordsAdd, payload);
            yield put({
                type: "_autoReplyKeywordsAdd",
                payload: response
            });
            if (callback) callback(response);
        },
        * autoReplyKeywordsEdit({ payload, callback }, { call, put }) {
            const response = yield call(wechat.autoReplyKeywordsEdit, payload);
            yield put({
                type: "_autoReplyKeywordsEdit",
                payload: response
            });
            if (callback) callback(response);
        },
        * autoReplyKeywordsDel({ payload, callback }, { call, put }) {
            const response = yield call(wechat.autoReplyKeywordsDel, payload);
            yield put({
                type: "_autoReplyKeywordsDel",
                payload: response
            });
            if (callback) callback(response);
        },
        * autoReplyKeywordsInfo({ payload, callback }, { call, put }) {
            const response = yield call(wechat.autoReplyKeywordsInfo, payload);
            yield put({
                type: "_autoReplyKeywordsInfo",
                payload: response
            });
            if (callback) callback(response);
        },
        * userList({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userList, payload);
            yield put({
                type: "_userList",
                payload: response
            });
            if (callback) callback(response);
        },
        * userBlackList({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userBlackList, payload);
            yield put({
                type: "_userBlackList",
                payload: response
            });
            if (callback) callback(response);
        },
        * userSelect({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userSelect, payload);
            yield put({
                type: "_userSelect",
                payload: response
            });
            if (callback) callback(response);
        },
        * userBlock({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userBlock, payload);
            yield put({
                type: "_userBlock",
                payload: response
            });
            if (callback) callback(response);
        },
        * userUnblock({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userUnblock, payload);
            yield put({
                type: "_userUnblock",
                payload: response
            });
            if (callback) callback(response);
        },
        * userRemark({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userRemark, payload);
            yield put({
                type: "_userRemark",
                payload: response
            });
            if (callback) callback(response);
        },
        * userTagList({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userTagList, payload);
            yield put({
                type: "_userTagList",
                payload: response
            });
            if (callback) callback(response);
        },
        * getToken({ payload, callback }, { call, put }) {
            const response = yield call(wechat.getToken, payload);
            yield put({
                type: "_getToken",
                payload: response
            });
            if (callback) callback(response);
        },
        * userTagCreate({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userTagCreate, payload);
            yield put({
                type: "_userTagCreate",
                payload: response
            });
            if (callback) callback(response);
        },
        * userTagUpdate({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userTagUpdate, payload);
            yield put({
                type: "_userTagUpdate",
                payload: response
            });
            if (callback) callback(response);
        },
        * userTagDelete({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userTagDelete, payload);
            yield put({
                type: "_userTagDelete",
                payload: response
            });
            if (callback) callback(response);
        },
        * userTagsByOpenid({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userTagsByOpenid, payload);
            yield put({
                type: "_userTagsByOpenid",
                payload: response
            });
            if (callback) callback(response);
        },
        * userTagUsersOfTag({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userTagUsersOfTag, payload);
            yield put({
                type: "_userTagUsersOfTag",
                payload: response
            });
            if (callback) callback(response);
        },
        * userTagTagUsers({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userTagTagUsers, payload);
            yield put({
                type: "_userTagTagUsers",
                payload: response
            });
            if (callback) callback(response);
        },
        * userTagUntagUsers({ payload, callback }, { call, put }) {
            const response = yield call(wechat.userTagUntagUsers, payload);
            yield put({
                type: "_userTagUntagUsers",
                payload: response
            });
            if (callback) callback(response);
        },
        * broadcastRecords({ payload, callback }, { call, put }) {
            const response = yield call(wechat.broadcastRecords, payload);
            yield put({
                type: "_broadcastRecords",
                payload: response
            });
            if (callback) callback(response);
        },
        * broadcastUserSearch({ payload, callback }, { call, put }) {
            const response = yield call(wechat.broadcastUserSearch, payload);
            yield put({
                type: "_broadcastUserSearch",
                payload: response
            });
            if (callback) callback(response);
        },
        * broadcastCreate({ payload, callback }, { call, put }) {
            const response = yield call(wechat.broadcastCreate, payload);
            yield put({
                type: "_broadcastCreate",
                payload: response
            });
            if (callback) callback(response);
        },
        * broadcastSurplus({ payload, callback }, { call, put }) {
            const response = yield call(wechat.broadcastSurplus, payload);
            yield put({
                type: "_broadcastSurplus",
                payload: response
            });
            if (callback) callback(response);
        },
        * broadcastRecordsDel({ payload, callback }, { call, put }) {
            const response = yield call(wechat.broadcastRecordsDel, payload);
            yield put({
                type: "_broadcastRecordsDel",
                payload: response
            });
            if (callback) callback(response);
        },
        * wechatMaterialList({ payload, callback }, { call, put }) {
            const response = yield call(wechat.wechatMaterialList, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * materialUploadThumb({ payload, callback }, { call, put }) {
            const response = yield call(wechat.materialUploadThumb, payload);
            yield put({
                type: "_materialUploadThumb",
                payload: response
            });
            if (callback) callback(response);
        },
        * materialUploadArticle({ payload, callback }, { call, put }) {
            const response = yield call(wechat.materialUploadArticle, payload);
            yield put({
                type: "_materialUploadArticle",
                payload: response
            });
            if (callback) callback(response);
        },
        * materialUpdateArticle({ payload, callback }, { call, put }) {
            const response = yield call(wechat.materialUpdateArticle, payload);
            yield put({
                type: "_materialUpdateArticle",
                payload: response
            });
            if (callback) callback(response);
        },
        * materialGet({ payload, callback }, { call, put }) {
            const response = yield call(wechat.materialGet, payload);
            yield put({
                type: "_materialGet",
                payload: response
            });
            if (callback) callback(response);
        },
        * materialUploadArticleImage({ payload, callback }, { call, put }) {
            const response = yield call(wechat.materialUploadArticleImage, payload);
            yield put({
                type: "_materialUploadArticleImage",
                payload: response
            });
            if (callback) callback(response);
        },
        * materialUploadImage({ payload, callback }, { call, put }) {
            const response = yield call(wechat.materialUploadImage, payload);
            yield put({
                type: "_materialUploadImage",
                payload: response
            });
            if (callback) callback(response);
        },
        * materialUploadVoice({ payload, callback }, { call, put }) {
            const response = yield call(wechat.materialUploadVoice, payload);
            yield put({
                type: "_materialUploadVoice",
                payload: response
            });
            if (callback) callback(response);
        },
        * materialUploadVideo({ payload, callback }, { call, put }) {
            const response = yield call(wechat.materialUploadVideo, payload);
            yield put({
                type: "_materialUploadVideo",
                payload: response
            });
            if (callback) callback(response);
        },
        * localNews({ payload, callback }, { call, put }) {
            const response = yield call(wechat.localNews, payload);
            yield put({
                type: "_localNews",
                payload: response
            });
            if (callback) callback(response);
        },
        * localNewsInfo({ payload, callback }, { call, put }) {
            const response = yield call(wechat.localNewsInfo, payload);
            yield put({
                type: "_localNewsInfo",
                payload: response
            });
            if (callback) callback(response);
        },
        * localNewsAdd({ payload, callback }, { call, put }) {
            const response = yield call(wechat.localNewsAdd, payload);
            yield put({
                type: "_localNewsAdd",
                payload: response
            });
            if (callback) callback(response);
        },
        * localNewsEdit({ payload, callback }, { call, put }) {
            const response = yield call(wechat.localNewsEdit, payload);
            yield put({
                type: "_localNewsEdit",
                payload: response
            });
            if (callback) callback(response);
        },
        * localNewsDel({ payload, callback }, { call, put }) {
            const response = yield call(wechat.localNewsDel, payload);
            yield put({
                type: "_localNewsDel",
                payload: response
            });
            if (callback) callback(response);
        },
        * materialDelete({ payload, callback }, { call, put }) {
            const response = yield call(wechat.materialDelete, payload);
            yield put({
                type: "_materialDelete",
                payload: response
            });
            if (callback) callback(response);
        }
    },
    reducers: {
        _getConf(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        _checkApiStatus(state, action) {
            return {
                ...state,
                getConf: action.payload
            };
        },
        _confSet(state, action) {
            return {
                ...state,
                confSet: action.payload
            };
        },
        _menuList(state, action) {
            return {
                ...state,
                menuList: action.payload
            };
        },
        _menuCurrent(state, action) {
            return {
                ...state,
                menuCurrent: action.payload
            };
        },
        _menuCreate(state, action) {
            return {
                ...state,
                menuCreate: action.payload
            };
        },
        _menuDelete(state, action) {
            return {
                ...state,
                menuDelete: action.payload
            };
        },
        _autoReplyStatusSet(state, action) {
            return {
                ...state,
                autoReplyStatusSet: action.payload
            };
        },
        _autoReplyStatusGet(state, action) {
            return {
                ...state,
                autoReplyStatusGet: action.payload
            };
        },
        _autoReplySubscribeGet(state, action) {
            return {
                ...state,
                autoReplySubscribeGet: action.payload
            };
        },
        _autoReplySubscribeSet(state, action) {
            return {
                ...state,
                autoReplySubscribeSet: action.payload
            };
        },
        _replyKeywordsList(state, action) {
            return {
                ...state,
                replyKeywordsList: action.payload
            };
        },
        _autoReplyKeywordsAdd(state, action) {
            return {
                ...state,
                autoReplyKeywordsAdd: action.payload
            };
        },
        _autoReplyKeywordsEdit(state, action) {
            return {
                ...state,
                autoReplyKeywordsEdit: action.payload
            };
        },
        _autoReplyKeywordsDel(state, action) {
            return {
                ...state,
                autoReplyKeywordsDel: action.payload
            };
        },
        _autoReplyKeywordsInfo(state, action) {
            return {
                ...state,
                autoReplyKeywordsInfo: action.payload
            };
        },
        _userList(state, action) {
            return {
                ...state,
                userList: action.payload
            };
        },
        _userBlackList(state, action) {
            return {
                ...state,
                userBlackList: action.payload
            };
        },
        _userSelect(state, action) {
            return {
                ...state,
                userSelect: action.payload
            };
        },
        _userBlock(state, action) {
            return {
                ...state,
                userBlock: action.payload
            };
        },
        _userUnblock(state, action) {
            return {
                ...state,
                userUnblock: action.payload
            };
        },
        _userRemark(state, action) {
            return {
                ...state,
                userRemark: action.payload
            };
        },
        _userTagList(state, action) {
            return {
                ...state,
                userTagList: action.payload
            };
        },
        _getToken(state, action) {
            return {
                ...state,
                getToken: action.payload
            };
        },
        _userTagCreate(state, action) {
            return {
                ...state,
                userTagCreate: action.payload
            };
        },
        _userTagUpdate(state, action) {
            return {
                ...state,
                userTagUpdate: action.payload
            };
        },
        _userTagDelete(state, action) {
            return {
                ...state,
                userTagDelete: action.payload
            };
        },
        _userTagsByOpenid(state, action) {
            return {
                ...state,
                userTagsByOpenid: action.payload
            };
        },
        _userTagUsersOfTag(state, action) {
            return {
                ...state,
                userTagUsersOfTag: action.payload
            };
        },
        _userTagTagUsers(state, action) {
            return {
                ...state,
                userTagTagUsers: action.payload
            };
        },
        _userTagUntagUsers(state, action) {
            return {
                ...state,
                userTagUntagUsers: action.payload
            };
        },
        _broadcastRecords(state, action) {
            return {
                ...state,
                broadcastRecords: action.payload
            };
        },
        _broadcastUserSearch(state, action) {
            return {
                ...state,
                broadcastUserSearch: action.payload
            };
        },
        _broadcastCreate(state, action) {
            return {
                ...state,
                broadcastCreate: action.payload
            };
        },
        _broadcastSurplus(state, action) {
            return {
                ...state,
                broadcastSurplus: action.payload
            };
        },
        _broadcastRecordsDel(state, action) {
            return {
                ...state,
                broadcastRecordsDel: action.payload
            };
        },
        _wechatMaterialList(state, action) {
            return {
                ...state,
                wechatMaterialList: action.payload
            };
        },
        _materialUploadThumb(state, action) {
            return {
                ...state,
                materialUploadThumb: action.payload
            };
        },
        _materialUploadArticle(state, action) {
            return {
                ...state,
                materialUploadArticle: action.payload
            };
        },
        _materialUpdateArticle(state, action) {
            return {
                ...state,
                materialUpdateArticle: action.payload
            };
        },
        _materialGet(state, action) {
            return {
                ...state,
                materialGet: action.payload
            };
        },
        _materialUploadArticleImage(state, action) {
            return {
                ...state,
                materialUploadArticleImage: action.payload
            };
        },
        _materialUploadImage(state, action) {
            return {
                ...state,
                materialUploadImage: action.payload
            };
        },
        _materialUploadVoice(state, action) {
            return {
                ...state,
                materialUploadVoice: action.payload
            };
        },
        _materialUploadVideo(state, action) {
            return {
                ...state,
                materialUploadVideo: action.payload
            };
        },
        _localNews(state, action) {
            return {
                ...state,
                localNews: action.payload
            };
        },
        _localNewsInfo(state, action) {
            return {
                ...state,
                localNewsInfo: action.payload
            };
        },
        _localNewsAdd(state, action) {
            return {
                ...state,
                localNewsAdd: action.payload
            };
        },
        _localNewsEdit(state, action) {
            return {
                ...state,
                localNewsEdit: action.payload
            };
        },
        _localNewsDel(state, action) {
            return {
                ...state,
                localNewsDel: action.payload
            };
        },
        _materialDelete(state, action) {
            return {
                ...state,
                materialDelete: action.payload
            };
        }
    }
};
