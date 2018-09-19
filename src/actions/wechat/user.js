import types from '../../constants';

export const getWechatUserList = ({ params })=>{
    return dispatch => {
        dispatch({
            type : types.wechat.GET_WECHAT_USER_LIST,
            params,
        })
    }
}

export const setWechatUserList = ({ result, allUserListTotal, first })=>{
    let pageArr = []
    result.data.openid.map((openidItem,index)=>{
        if(index%20===0){
            pageArr.push(openidItem)
        }
    })
    return dispatch => {
        dispatch({
            type: types.wechat.SET_USER_LIST,
            userList:result,
            allUserListTotal,
        })
        if(first){
            dispatch({
                type: types.wechat.SET_WECHAT_USER_LIST_PAGE_ARR,
                pageArr,
            })
        }
    }
}

export const getWechatUserListByTag = ({ params })=>{
    return dispatch => {
        dispatch({
            type : types.wechat.GET_WECHAT_USER_LIST_BY_TAG,
            params,
        })
    }
}

export const setWechatUserListByTag = ({ result })=>{
    return dispatch => {
        dispatch({
            type: types.wechat.SET_WECHAT_USER_LIST_BY_TAG,
            userList:result,
        })
    }
}

export const getWechatuserBlackList = ()=>{
    return dispatch => {
        dispatch({
            type : types.wechat.GET_WECHAT_USER_BLACK_LIST,
        })
    }
}

export const setUserBlock = ({ params })=>{
    return dispatch => {
        dispatch({
            type : types.wechat.SET_WECHAT_USER_BLACK,
            params
        })
    }
}

export const setUserUnblock = ({ params })=>{
    return dispatch => {
        dispatch({
            type : types.wechat.SET_WECHAT_USER_UNBLACK,
            params
        })
    }
}

export const editUserRemark = ({ params, editType })=>{
    return dispatch => {
        dispatch({
            type : types.wechat.EDIT_WECHAT_USER_REMARK,
            params,
            editType
        })
    }
}

export const setWechatUserBlackList = ({result})=>{
    return dispatch => {
        dispatch({
            type: types.wechat.SET_WECHAT_USER_BLACK_LIST,
            userBlackList:result,
        })
    }
}

export const setWechatUserInfoList = ({result})=>{
    return dispatch => {
        dispatch({
            type: types.wechat.SET_WECHAT_USER_INFO_LIST,
            userInfoList:result,
        })
    }
}

export const setWechatUserInfoBlackList = ({result})=>{
    return dispatch => {
        dispatch({
            type: types.wechat.SET_WECHAT_USER_INFO_BLACK_LIST,
            userInfoBlackList:result,
        })
    }
}
