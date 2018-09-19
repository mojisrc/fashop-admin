import types from '../../constants';

export const getAutoReplyStatus = ()=>{
    return dispatch => {
        dispatch({
            type : types.wechat.GET_AUTO_REPLY_STATUS,
        })
    }
}

export const saveAutoReplyStatus = ({result})=>{
    return dispatch => {
        dispatch({
            type: types.wechat.SAVE_AUTO_REPLY_STATUS,
            autoReplyStatus:result.status,
        })
    }
}

export const setAutoReplyStatus = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.SET_AUTO_REPLY_STATUS,
            params
        })
    }
}

export const getKeyWordsReplyList = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.GET_KEYWORDS_REPLY_LIST,
            params
        })
    }
}

export const delAutoReplyKeywords = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.DEL_AUTO_REPLY_KEYWORDS,
            params
        })
    }
}

export const addAutoReplyKeywords = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.ADD_AUTO_REPLY_KEYWORDS,
            params
        })
    }
}

export const editAutoReplyKeywords = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.EDIT_AUTO_REPLY_KEYWORDS,
            params
        })
    }
}

export const saveKeyWordsReplyList = ({result})=>{
    return dispatch => {
        dispatch({
            type: types.wechat.SAVE_KEYWORDS_REPLY_LIST,
            keyWordsReplyList:result,
        })
    }
}

export const getAutoReplyKeywordsInfo = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.GET_AUTO_REPLY_KEYWORDS_DETAIL,
            params
        })
    }
}

export const setAutoReplyKeywordsInfo = ({result})=>{
    return dispatch => {
        dispatch({
            type: types.wechat.SET_AUTO_REPLY_KEYWORDS_DETAIL,
            autoReplyKeywordsInfo:result,
        })
    }
}

export const getFollowedReplyInfo = ()=>{
    return dispatch => {
        dispatch({
            type : types.wechat.GET_FOLLOWED_REPLY_INFO,
        })
    }
}

export const saveFollowedReplyInfo = ({result})=>{
    return dispatch => {
        dispatch({
            type: types.wechat.SAVE_FOLLOWED_REPLY_INFO,
            followedReplyInfo:result,
        })
    }
}

export const setFollowedReplyInfo = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.SET_FOLLOWED_REPLY_INFO,
            params
        })
    }
}
