import types from '../../constants';


export const getAreaListData = ()=>{
    return dispatch => {
        dispatch({
            type : types.setting.GET_AREA_LIST,
        })
    }
}


export const setAreaListData = ({list})=>{
    return dispatch => {
        dispatch({
            type : types.setting.SET_AREA_LIST,
            list,
        })
    }
}


export const setingPay = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.setting.SETTING_PAY,
            params
        })
    }
}

export const settingSmspro = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.setting.PSETTING_SMSPROVIDER,
            params
        })
    }
}

export const sendSmscene = ()=>{
    return dispatch => {
        dispatch({
            type : types.setting.SMSLIST_SETTING,
        })
    }
}

export const receiveSmslist = ({list})=>{
    return dispatch => {
        dispatch({
            type : types.setting.CREEIVESMSLIST_SETTING,
            list
        })
    }
}

export const smsScenceedit = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.setting.SMSSCENCEEDIT_SEETING,
            params
        })
    }
}

export const sendSmsinfo = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.setting.SMSSCENEINFO_SETTING,
            params
        })
    }
}

export const getInfoMessage = ({info})=>{
    return dispatch => {
        dispatch({
            type : types.setting.GETSMSCENEINFO_SETTING,
            info
        })
    }
}
