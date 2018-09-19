import types from '../../constants';
import {fetchStatus} from '../../utils';


export const setIsShowBootPage = (e)=>{
    return dispatch => {
        dispatch({
            type : types.app.UPDATE_FIRST_OPEN,
            data : e,
        })
    }
}

export const setIsShowFetchLoading = (e)=>{
    return dispatch => {
        dispatch({
            type : types.app.UPDATE_FETCH_LOADING,
            data : e,
        })
    }
}
