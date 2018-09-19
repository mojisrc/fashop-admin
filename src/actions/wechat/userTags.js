import types from '../../constants';

export const getWechatUserTagList = ()=>{
    return dispatch => {
        dispatch({
            type : types.wechat.GET_WECHAT_USER_TAG_LIST,
        })
    }
}

export const addWechatUserTagList = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.ADD_WECHAT_USER_TAG_LIST,
            params
        })
    }
}

export const editWechatUserTagList = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.EDIT_WECHAT_USER_TAG_LIST,
            params
        })
    }
}

export const delWechatUserTagList = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.DEL_WECHAT_USER_TAG_LIST,
            params
        })
    }
}

export const tagWechatUser = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.TAG_WECHAT_USER,
            params
        })
    }
}

export const untagWechatUser = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.UNTAG_WECHAT_USER,
            params
        })
    }
}

export const setWechatUserTagList = ({result})=>{
    return dispatch => {
        dispatch({
            type: types.wechat.SET_WECHAT_USER_TAG_LIST,
            userTagList:result,
        })
    }
}
