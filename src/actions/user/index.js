import types from '../../constants';
import Fetch from "../../utils/fetch";
import { UserApi } from "../../config/api/user";

export const getUserList = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.user.GET_USER_LIST,
            params,
            userListParams:params
        })
    }
}

export const saveUserList = ({ result, params }) => {
    const { page, rows } = params
    const { total_number, list } = result
    return dispatch => {
        dispatch({
            type: types.user.SAVE_USER_LIST,
            userList: {
                page,
                rows,
                total_number,
                list
            }
        })
    }
}

export const getUserInfo = ({ params }) => {
    return Fetch.fetch({ api: UserApi.info, params })
}
export const getUserStatistics = ({ params  }) => {
    return Fetch.fetch({ api: UserApi.statistics, params })
}


export const saveUserInfo = ({ result }) => {
    return dispatch => {
        dispatch({
            type: types.user.SAVE_USER_INFO,
            userInfo: result
        })
    }
}

