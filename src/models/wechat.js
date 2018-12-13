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
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * checkApiStatus({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * confSet({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * menuList({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * menuCurrent({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * menuCreate({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * menuDelete({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * autoReplyStatusSet({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * autoReplyStatusGet({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * autoReplySubscribeGet({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * autoReplySubscribeSet({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * replyKeywordsList({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * autoReplyKeywordsAdd({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * autoReplyKeywordsEdit({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * autoReplyKeywordsDel({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * autoReplyKeywordsInfo({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * userList({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * userBlackList({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * userSelect({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * userBlock({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * userUnblock({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * userRemark({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * userTagList({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * getToken({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * userTagCreate({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * userTagUpdate({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * userTagDelete({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * userTagsByOpenid({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * userTagUsersOfTag({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * userTagTagUsers({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * userTagUntagUsers({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * broadcastRecords({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * broadcastUserSearch({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * broadcastCreate({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * broadcastSurplus({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * broadcastRecordsDel({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * wechatMaterialList({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * materialUploadThumb({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * materialUploadArticle({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * materialUpdateArticle({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * materialGet({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * materialUploadArticleImage({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * materialUploadImage({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * materialUploadVoice({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * materialUploadVideo({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * localNews({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * localNewsInfo({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * localNewsAdd({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * localNewsEdit({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * localNewsDel({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * materialDelete({ payload }, { call, put }) {
            const response = yield call(wechat.list, payload);
            yield put({
                type: "list",
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
                edit: action.payload
            };
        },
        confSet(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        menuList(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        menuCurrent(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        menuCreate(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        menuDelete(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        autoReplyStatusSet(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        autoReplyStatusGet(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        autoReplySubscribeGet(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        autoReplySubscribeSet(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        replyKeywordsList(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        autoReplyKeywordsAdd(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        autoReplyKeywordsEdit(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        autoReplyKeywordsDel(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        autoReplyKeywordsInfo(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        userList(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        userBlackList(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        userSelect(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        userBlock(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        userUnblock(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        userRemark(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        userTagList(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        getToken(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        userTagCreate(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        userTagUpdate(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        userTagDelete(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        userTagsByOpenid(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        userTagUsersOfTag(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        userTagTagUsers(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        userTagUntagUsers(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        broadcastRecords(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        broadcastUserSearch(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        broadcastCreate(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        broadcastSurplus(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        broadcastRecordsDel(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        wechatMaterialList(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        materialUploadThumb(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        materialUploadArticle(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        materialUpdateArticle(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        materialGet(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        materialUploadArticleImage(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        materialUploadImage(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        materialUploadVoice(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        materialUploadVideo(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        localNews(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        localNewsInfo(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        localNewsAdd(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        localNewsEdit(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        localNewsDel(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        materialDelete(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        }
    }
};
