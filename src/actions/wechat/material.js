import types from '../../constants';

export const getWechatMaterialList = ({ params })=>{
    return dispatch => {
        dispatch({
            type : types.wechat.GET_MATERIAL_LIST,
            params,
        })
    }
}

export const setImageMaterialList = ({ result, currentPage, pageSize })=>{
    return dispatch => {
        dispatch({
            type: types.wechat.SET_IMAGE_MATERIAL_LIST,
            imageMaterialList:result,
            currentPage,
            pageSize,
        })
    }
}

export const setVideoMaterialList = ({ result, currentPage, pageSize })=>{
    return dispatch => {
        dispatch({
            type: types.wechat.SET_VIDEO_MATERIAL_LIST,
            videoMaterialList:result,
            currentPage,
            pageSize,
        })
    }
}

export const setVoiceMaterialList = ({ result, currentPage, pageSize })=>{
    return dispatch => {
        dispatch({
            type: types.wechat.SET_VOICE_MATERIAL_LIST,
            voiceMaterialList:result,
            currentPage,
            pageSize,
        })
    }
}

export const setNewsMaterialList = ({ result, currentPage, pageSize })=>{
    return dispatch => {
        dispatch({
            type: types.wechat.SET_NEWS_MATERIAL_LIST,
            newsMaterialList:result,
            currentPage,
            pageSize,
        })
    }
}

export const getLocalNewsMaterialList = ({ params })=>{
    return dispatch => {
        dispatch({
            type : types.wechat.GET_LOCAL_NEWS_MATERIAL_LIST,
            params,
        })
    }
}
export const setLocalNewsMaterialList = ({ result, currentPage, pageSize })=>{
    return dispatch => {
        dispatch({
            type: types.wechat.SET_LOCAL_NEWS_MATERIAL_LIST,
            localNewsMaterialList:result,
            currentPage,
            pageSize,
        })
    }
}

export const addWechatMaterial = ({params})=>{
    console.log(params);
    return dispatch => {
        dispatch({
            type : types.wechat.ADD_WECHAT_MATERIAL,
            params,
        })
    }
}

export const editWechatMaterial = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.EDIT_WECHAT_MATERIAL,
            params,
        })
    }
}

export const delWechatMaterial = ({params,callParams})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.DEL_WECHAT_MATERIAL,
            params,
            callParams,
        })
    }
}

export const addWechatMaterialVoice = ({params})=>{
    console.log(params);
    return dispatch => {
        dispatch({
            type : types.wechat.ADD_WECHAT_MATERIAL_VOICE,
            params,
        })
    }
}

export const addLocalNewsMaterialList = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.ADD_LOCAL_NEWS_MATERIAL_LIST,
            params,
        })
    }
}

export const editLocalNewsMaterialList = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.EDIT_LOCAL_NEWS_MATERIAL_LIST,
            params,
        })
    }
}

export const delLocalNewsMaterialList = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.DEL_LOCAL_NEWS_MATERIAL_LIST,
            params,
        })
    }
}

export const getWechatMaterialInfo = ({ params })=>{
    return dispatch => {
        dispatch({
            type : types.wechat.GET_WECHAT_MATERIAL_INFO,
            params,
        })
    }
}
export const getLocalnewsMaterialInfo = ({ params })=>{
    return dispatch => {
        dispatch({
            type : types.wechat.GET_LOCALNEWS_MATERIAL_INFO,
            params,
        })
    }
}
export const setWechatMaterialInfo = ({ result })=>{
    return dispatch => {
        dispatch({
            type: types.wechat.SET_WECHAT_MATERIAL_INFO,
            wechatMaterialInfo:result,
        })
    }
}

export const setLocalnewsMaterialInfo = ({ result })=>{
    return dispatch => {
        dispatch({
            type: types.wechat.SET_LOCALNEWS_MATERIAL_INFO,
            localnewsMaterialInfo:result,
        })
    }
}
