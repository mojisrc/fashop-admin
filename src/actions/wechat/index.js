import types from '../../constants';

export const getWechatConfigInfo = ()=>{
    return dispatch => {
        dispatch({
            type : types.wechat.GET_WECHAT_IFBIND,
        })
    }
}

export const getWechatApiStatus = ()=>{
    return dispatch => {
        dispatch({
            type : types.wechat.GET_WECHAT_API_STATUS,
        })
    }
}

export const editWechatConfig = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.SET_WECHAT_CONFIG,
            params,
        })
    }
}

export const setWechatConfigInfo = ({result})=>{
    return dispatch => {
        dispatch({
            type: types.wechat.SET_WECHAT_IFBIND,
            wechatConfigInfo:result,
        })
    }
}

export const setWechatApiStatus = ({result})=>{
    return dispatch => {
        dispatch({
            type: types.wechat.SET_WECHAT_API_STATUS,
            wechatApiStatus:!!result,
        })
    }
}

export const getWechatMenuList = ()=>{
    return dispatch => {
        dispatch({
            type : types.wechat.GET_WECHAT_MENU_LIST,
        })
    }
}

export const setWechatMenuList = ({result})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.SET_WECHAT_MENU_LIST,
            wechatMenuList:result
        })
    }
}

export const setCurrentMenu = ({currentMenu})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.SET_CURRENT_MENU,
            currentMenu
        })
    }
}

export const createWechatMenuList = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.CREATE_WECHAT_MENU_LIST,
            params,
        })
    }
}
