import types from '../constants';

const initialState = {
    // menu
    currentMenu: [-1, -1],
    wechatConfigInfo: {},
    wechatApiStatus: true,
    wechatMenuList: {},
    //autoReply
    autoReplyStatus: 0,
    keyWordsReplyList: {},
    autoReplyKeywordsInfo: {},
    keyWordsReplyListLoading: false,
    followedReplyInfo: {},
    //material
    materialListLoading: false,
    currentPage: 1,
    pageSize: 10,
    imageMaterialList: {},
    videoMaterialList: {},
    voiceMaterialList: {},
    newsMaterialList: {},
    localNewsMaterialListLoading: false,
    localNewsMaterialList: {},
    wechatMaterialInfo: {},
    localnewsMaterialInfo: {},
    //broadcast
    broadcastRecordLoading: true,
    broadcastRecord: [],
    broadcastRecordUserSearch: {
        total_number: 0
    },
    broadcastRecordSurplus: {},

    // user
    userListLoading: true,
    userBlackListLoading: true,
    userList: [],
    allUserListTotal: 0,
    pageArr: [],
    userBlackList: [],
    userInfoList: [],
    userInfoBlackList: [],
    // uset tags
    userTagList: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.wechat.SET_CURRENT_MENU:
            return Object.assign({}, state, {
                currentMenu: action.currentMenu,
            })
        // case types.wechat.SET_WECHAT_IFBIND:
        //     return Object.assign({}, state, {
        //         wechatConfigInfo: action.wechatConfigInfo,
        //     })
        case types.wechat.SET_WECHAT_IFBIND:
            return Object.assign({}, state, {
                wechatApiStatus: action.wechatApiStatus,
            })
        case types.wechat.SET_WECHAT_MENU_LIST:
            return Object.assign({}, state, {
                wechatMenuList: action.wechatMenuList,
            })

        // auto reply
        case types.wechat.SAVE_AUTO_REPLY_STATUS:
            return Object.assign({}, state, {
                autoReplyStatus: action.autoReplyStatus,
            })
        case types.wechat.START_GET_KEYWORDS_REPLY_LIST:
            return Object.assign({}, state, {
                keyWordsReplyListLoading: true,
            })
        case types.wechat.SAVE_KEYWORDS_REPLY_LIST:
            return Object.assign({}, state, {
                keyWordsReplyList: action.keyWordsReplyList,
                keyWordsReplyListLoading: false
            })
        case types.wechat.SET_AUTO_REPLY_KEYWORDS_DETAIL:
            return Object.assign({}, state, {
                autoReplyKeywordsInfo: action.autoReplyKeywordsInfo,
            })
        case types.wechat.SAVE_FOLLOWED_REPLY_INFO:
            return Object.assign({}, state, {
                followedReplyInfo: action.followedReplyInfo,
            })

        // material

        case types.wechat.START_GET_MATERIAL_LIST:
            return Object.assign({}, state, {
                materialListLoading: true
            })
        case types.wechat.SET_IMAGE_MATERIAL_LIST:
            return Object.assign({}, state, {
                imageMaterialList: action.imageMaterialList,
                imageCurrentPage: action.currentPage,
                imagePageSize: action.pageSize,
                materialListLoading: false,
            })
        case types.wechat.SET_VIDEO_MATERIAL_LIST:
            return Object.assign({}, state, {
                videoMaterialList: action.videoMaterialList,
                videoCurrentPage: action.currentPage,
                videoPageSize: action.pageSize,
                materialListLoading: false,
            })
        case types.wechat.SET_VOICE_MATERIAL_LIST:
            return Object.assign({}, state, {
                voiceMaterialList: action.voiceMaterialList,
                voiceCurrentPage: action.currentPage,
                voicePageSize: action.pageSize,
                materialListLoading: false,
            })
        case types.wechat.SET_NEWS_MATERIAL_LIST:
            return Object.assign({}, state, {
                newsMaterialList: action.newsMaterialList,
                newsCurrentPage: action.currentPage,
                newsPageSize: action.pageSize,
                materialListLoading: false,
            })
        case types.wechat.START_GET_LOCAL_NEWS_MATERIAL_LIST:
            return Object.assign({}, state, {
                localNewsMaterialListLoading: true
            })
        case types.wechat.SET_LOCAL_NEWS_MATERIAL_LIST:
            return Object.assign({}, state, {
                localNewsMaterialList: action.localNewsMaterialList,
                localNewsCurrentPage: action.currentPage,
                localNewsPageSize: action.pageSize,
                localNewsMaterialListLoading: false,
            })
        case types.wechat.SET_WECHAT_MATERIAL_INFO:
            return Object.assign({}, state, {
                wechatMaterialInfo: action.wechatMaterialInfo,
            })
        case types.wechat.SET_LOCALNEWS_MATERIAL_INFO:
            return Object.assign({}, state, {
                localnewsMaterialInfo: action.localnewsMaterialInfo,
            })
        // broadcast
        case types.wechat.START_GET_BROADCAST_RECORD:
            return Object.assign({}, state, {
                broadcastRecordLoading: true
            })
        case types.wechat.SET_BROADCAST_RECORD:
            return Object.assign({}, state, {
                broadcastRecord: action.broadcastRecord,
                broadcastRecordLoading: false,
            })
        case types.wechat.SET_BROADCAST_USER_SEARCH:
            return Object.assign({}, state, {
                broadcastRecordUserSearch: action.broadcastRecordUserSearch,
            })
        case types.wechat.SET_BROADCAST_SURPLUS:
            return Object.assign({}, state, {
                broadcastRecordSurplus: action.broadcastRecordSurplus,
            })

        // user
        case types.wechat.START_GET_USER_LIST:
            return Object.assign({}, state, {
                userListLoading: true
            })
        case types.wechat.START_GET_USER_LIST_BY_TAG:
            return Object.assign({}, state, {
                userListLoading: true
            })
        case types.wechat.SET_USER_LIST:
            return Object.assign({}, state, {
                userList: action.userList,
                allUserListTotal: action.allUserListTotal,
                userListLoading: false,
            })
        case types.wechat.SET_USER_LIST_PAGE_ARR:
            return Object.assign({}, state, {
                pageArr: action.pageArr,
            })
        case types.wechat.SET_USER_LIST_BY_TAG:
            return Object.assign({}, state, {
                userList: action.userList,
                userListLoading: false,
            })
        case types.wechat.START_GET_USER_BLACK_LIST:
            return Object.assign({}, state, {
                userBlackListLoading: true
            })
        case types.wechat.SET_USER_BLACK_LIST:
            return Object.assign({}, state, {
                userBlackList: action.userBlackList,
                userBlackListLoading: false
            })
        case types.wechat.SET_USER_INFO_LIST:
            return Object.assign({}, state, {
                userInfoList: action.userInfoList,
                userListLoading: false,
            })
        case types.wechat.SET_USER_INFO_BLACK_LIST:
            return Object.assign({}, state, {
                userInfoBlackList: action.userInfoBlackList,
            })
        // user tags
        case types.wechat.SET_USER_TAG_LIST:
            return Object.assign({}, state, {
                userTagList: action.userTagList,
            })
        default:
            return state;
    }
}
