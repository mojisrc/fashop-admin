import types from '../../constants';
import { Fetch } from "../../utils";
import { FreightApi } from "../../config/api/freight"

export const getFreightList = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.freight.GET_FREIGHT_LIST,
            params,
        })
    }
}
export const getFreightInfo = ({ params }) => {
    return Fetch.fetch({ api: FreightApi.info, params })
}

export const setFreightList = ({ params, result }) => {
    return dispatch => {
        const {
            page,
            rows,
        } = params
        const {
            total_number,
            list,
        } = result
        dispatch({
            type: types.freight.SET_FREIGHT_LIST,
            data: {
                page,
                rows,
                total_number,
                list,
            },
        })
    }
}

export const setFreightInfo = ({ result }) => {
    return dispatch => {
        dispatch({
            type: types.freight.SET_FREIGHT_INFO,
            result
        })
    }
}

export const addFreight = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.freight.ADD_FREIGHT,
            params,
        })
    }
}


export const editFreight = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.freight.EDIT_FREIGHT,
            params,
        })
    }
}


export const delFreight = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.freight.DEL_FREIGHT,
            params,
        })
    }
}



