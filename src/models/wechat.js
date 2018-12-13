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
        * getConf({ payload }, { call, put }) {
            const response = yield call(wechat.getConf, payload);
            yield put({
                type: "getConf",
                payload: response
            });
        },
        * checkApiStatus({ payload }, { call, put }) {
            const response = yield call(wechat.checkApiStatus, payload);
            yield put({
                type: "checkApiStatus",
                payload: response
            });
        },
        * confSet({ payload }, { call, put }) {
            const response = yield call(wechat.confSet, payload);
            yield put({
                type: "confSet",
                payload: response
            });
        },
        * menuList({ payload }, { call, put }) {
            const response = yield call(wechat.confSet, payload);
            yield put({
                type: "confSet",
                payload: response
            });
        },
        * menuCurrent({ payload }, { call, put }) {
            const response = yield call(wechat.menuCurrent, payload);
            yield put({
                type: "menuCurrent",
                payload: response
            });
        },
        * menuCreate({ payload }, { call, put }) {
            const response = yield call(wechat.menuCreate, payload);
            yield put({
                type: "menuCreate",
                payload: response
            });
        },
        * menuDelete({ payload }, { call, put }) {
            const response = yield call(wechat.menuDelete, payload);
            yield put({
                type: "menuDelete",
                payload: response
            });
        },
        * autoReplyStatusSet({ payload }, { call, put }) {
            const response = yield call(wechat.autoReplyStatusSet, payload);
            yield put({
                type: "autoReplyStatusSet",
                payload: response
            });
        },
        * autoReplyStatusGet({ payload }, { call, put }) {
            const response = yield call(wechat.autoReplyStatusGet, payload);
            yield put({
                type: "autoReplyStatusGet",
                payload: response
            });
        },
        * autoReplySubscribeGet({ payload }, { call, put }) {
            const response = yield call(wechat.autoReplySubscribeGet, payload);
            yield put({
                type: "autoReplySubscribeGet",
                payload: response
            });
        },
        * autoReplySubscribeSet({ payload }, { call, put }) {
            const response = yield call(wechat.autoReplySubscribeSet, payload);
            yield put({
                type: "autoReplySubscribeSet",
                payload: response
            });
        },
        * replyKeywordsList({ payload }, { call, put }) {
            const response = yield call(wechat.replyKeywordsList, payload);
            yield put({
                type: "replyKeywordsList",
                payload: response
            });
        },
        * autoReplyKeywordsAdd({ payload }, { call, put }) {
            const response = yield call(wechat.autoReplyKeywordsAdd, payload);
            yield put({
                type: "autoReplyKeywordsAdd",
                payload: response
            });
        },
        * autoReplyKeywordsEdit({ payload }, { call, put }) {
            const response = yield call(wechat.autoReplyKeywordsEdit, payload);
            yield put({
                type: "autoReplyKeywordsEdit",
                payload: response
            });
        },
        * autoReplyKeywordsDel({ payload }, { call, put }) {
            const response = yield call(wechat.autoReplyKeywordsDel, payload);
            yield put({
                type: "autoReplyKeywordsDel",
                payload: response
            });
        },
        * autoReplyKeywordsInfo({ payload }, { call, put }) {
            const response = yield call(wechat.autoReplyKeywordsInfo, payload);
            yield put({
                type: "autoReplyKeywordsInfo",
                payload: response
            });
        },
        * userList({ payload }, { call, put }) {
            const response = yield call(wechat.userList, payload);
            yield put({
                type: "userList",
                payload: response
            });
        },
        * userBlackList({ payload }, { call, put }) {
            const response = yield call(wechat.userBlackList, payload);
            yield put({
                type: "userBlackList",
                payload: response
            });
        },
        * userSelect({ payload }, { call, put }) {
            const response = yield call(wechat.userSelect, payload);
            yield put({
                type: "userSelect",
                payload: response
            });
        },
        * userBlock({ payload }, { call, put }) {
            const response = yield call(wechat.userBlock, payload);
            yield put({
                type: "userBlock",
                payload: response
            });
        },
        * userUnblock({ payload }, { call, put }) {
            const response = yield call(wechat.userUnblock, payload);
            yield put({
                type: "userUnblock",
                payload: response
            });
        },
        * userRemark({ payload }, { call, put }) {
            const response = yield call(wechat.userRemark, payload);
            yield put({
                type: "userRemark",
                payload: response
            });
        },
        * userTagList({ payload }, { call, put }) {
            const response = yield call(wechat.userTagList, payload);
            yield put({
                type: "userTagList",
                payload: response
            });
        },
        * getToken({ payload }, { call, put }) {
            const response = yield call(wechat.getToken, payload);
            yield put({
                type: "getToken",
                payload: response
            });
        },
        * userTagCreate({ payload }, { call, put }) {
            const response = yield call(wechat.userTagCreate, payload);
            yield put({
                type: "userTagCreate",
                payload: response
            });
        },
        * userTagUpdate({ payload }, { call, put }) {
            const response = yield call(wechat.userTagUpdate, payload);
            yield put({
                type: "userTagUpdate",
                payload: response
            });
        },
        * userTagDelete({ payload }, { call, put }) {
            const response = yield call(wechat.userTagDelete, payload);
            yield put({
                type: "userTagDelete",
                payload: response
            });
        },
        * userTagsByOpenid({ payload }, { call, put }) {
            const response = yield call(wechat.userTagsByOpenid, payload);
            yield put({
                type: "userTagsByOpenid",
                payload: response
            });
        },
        * userTagUsersOfTag({ payload }, { call, put }) {
            const response = yield call(wechat.userTagUsersOfTag, payload);
            yield put({
                type: "userTagUsersOfTag",
                payload: response
            });
        },
        * userTagTagUsers({ payload }, { call, put }) {
            const response = yield call(wechat.userTagTagUsers, payload);
            yield put({
                type: "userTagTagUsers",
                payload: response
            });
        },
        * userTagUntagUsers({ payload }, { call, put }) {
            const response = yield call(wechat.userTagUntagUsers, payload);
            yield put({
                type: "userTagUntagUsers",
                payload: response
            });
        },
        * broadcastRecords({ payload }, { call, put }) {
            const response = yield call(wechat.broadcastRecords, payload);
            yield put({
                type: "broadcastRecords",
                payload: response
            });
        },
        * broadcastUserSearch({ payload }, { call, put }) {
            const response = yield call(wechat.broadcastUserSearch, payload);
            yield put({
                type: "broadcastUserSearch",
                payload: response
            });
        },
        * broadcastCreate({ payload }, { call, put }) {
            const response = yield call(wechat.broadcastCreate, payload);
            yield put({
                type: "broadcastCreate",
                payload: response
            });
        },
        * broadcastSurplus({ payload }, { call, put }) {
            const response = yield call(wechat.broadcastSurplus, payload);
            yield put({
                type: "broadcastSurplus",
                payload: response
            });
        },
        * broadcastRecordsDel({ payload }, { call, put }) {
            const response = yield call(wechat.broadcastRecordsDel, payload);
            yield put({
                type: "broadcastRecordsDel",
                payload: response
            });
        },
        * wechatMaterialList({ payload }, { call, put }) {
            const response = yield call(wechat.wechatMaterialList, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * materialUploadThumb({ payload }, { call, put }) {
            const response = yield call(wechat.materialUploadThumb, payload);
            yield put({
                type: "materialUploadThumb",
                payload: response
            });
        },
        * materialUploadArticle({ payload }, { call, put }) {
            const response = yield call(wechat.materialUploadArticle, payload);
            yield put({
                type: "materialUploadArticle",
                payload: response
            });
        },
        * materialUpdateArticle({ payload }, { call, put }) {
            const response = yield call(wechat.materialUpdateArticle, payload);
            yield put({
                type: "materialUpdateArticle",
                payload: response
            });
        },
        * materialGet({ payload }, { call, put }) {
            const response = yield call(wechat.materialGet, payload);
            yield put({
                type: "materialGet",
                payload: response
            });
        },
        * materialUploadArticleImage({ payload }, { call, put }) {
            const response = yield call(wechat.materialUploadArticleImage, payload);
            yield put({
                type: "materialUploadArticleImage",
                payload: response
            });
        },
        * materialUploadImage({ payload }, { call, put }) {
            const response = yield call(wechat.materialUploadImage, payload);
            yield put({
                type: "materialUploadImage",
                payload: response
            });
        },
        * materialUploadVoice({ payload }, { call, put }) {
            const response = yield call(wechat.materialUploadVoice, payload);
            yield put({
                type: "materialUploadVoice",
                payload: response
            });
        },
        * materialUploadVideo({ payload }, { call, put }) {
            const response = yield call(wechat.materialUploadVideo, payload);
            yield put({
                type: "materialUploadVideo",
                payload: response
            });
        },
        * localNews({ payload }, { call, put }) {
            const response = yield call(wechat.localNews, payload);
            yield put({
                type: "localNews",
                payload: response
            });
        },
        * localNewsInfo({ payload }, { call, put }) {
            const response = yield call(wechat.localNewsInfo, payload);
            yield put({
                type: "localNewsInfo",
                payload: response
            });
        },
        * localNewsAdd({ payload }, { call, put }) {
            const response = yield call(wechat.localNewsAdd, payload);
            yield put({
                type: "localNewsAdd",
                payload: response
            });
        },
        * localNewsEdit({ payload }, { call, put }) {
            const response = yield call(wechat.localNewsEdit, payload);
            yield put({
                type: "localNewsEdit",
                payload: response
            });
        },
        * localNewsDel({ payload }, { call, put }) {
            const response = yield call(wechat.localNewsDel, payload);
            yield put({
                type: "localNewsDel",
                payload: response
            });
        },
        * materialDelete({ payload }, { call, put }) {
            const response = yield call(wechat.materialDelete, payload);
            yield put({
                type: "materialDelete",
                payload: response
            });
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
