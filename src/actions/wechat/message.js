import types from '../../constants';

export const getBroadcastRecord = ({ params })=>{
    return dispatch => {
        dispatch({
            type : types.wechat.GET_BROADCAST_RECORD,
            params,
        })
    }
}

export const setBroadcastRecord = ({ result })=>{
    return dispatch => {
        dispatch({
            type: types.wechat.SET_BROADCAST_RECORD,
            broadcastRecord:result,
        })
    }
}

export const createWechatBroadcast = ({ params })=>{
    return dispatch => {
        dispatch({
            type : types.wechat.CREATE_WECHAT_BROADCAST,
            params,
        })
    }
}

export const delBroadcastRecord = ({ params })=>{
    return dispatch => {
        dispatch({
            type : types.wechat.DEL_WECHAT_BROADCAST,
            params,
        })
    }
}

export const getBroadcastUserSearch = ({ params })=>{
    return dispatch => {
        dispatch({
            type : types.wechat.GET_BROADCAST_USER_SEARCH,
            params,
        })
    }
}

export const setBroadcastUserSearch = ({ result })=>{
    return dispatch => {
        dispatch({
            type: types.wechat.SET_BROADCAST_USER_SEARCH,
            broadcastRecordUserSearch:result,
        })
    }
}

export const getBroadcastSurplus = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.wechat.GET_BROADCAST_SURPLUS,
            params
        })
    }
}

export const setBroadcastSurplus = ({ result })=>{
    return dispatch => {
        dispatch({
            type: types.wechat.SET_BROADCAST_SURPLUS,
            broadcastRecordSurplus:result,
        })
    }
}
