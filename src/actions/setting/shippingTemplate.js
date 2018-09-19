import types from '../../constants';
import { fetchStatus} from '../../utils';

export const getShippingTemplateList = (callback)=>{
    return dispatch => {
        dispatch({
            type: types.setting.GET_FREIGHT_LIST,
            callback
        })
    }
}


export const setShippingTemplateList = ({list})=>{
    return dispatch => {
        dispatch({
            type: types.setting.SET_FREIGHT_LIST,
            list,
        })
        return new Promise((resolve, reject)=>{
            resolve()
        })
    }
}
