import types from '../../constants';
import Fetch from "../../utils/fetch";
import { GoodsApi } from "../../config/api/goods"

export const getGoodsList = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.goods.GET_GOODS_LIST,
            params,
        })
    }
}
export const getGoodsInfo = ({ params }) => {
    return Fetch.fetch({ api: GoodsApi.info, params })
}

export const setGoodsList = ({ params, result }) => {
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
            type: types.goods.SET_GOODS_LIST,
            data: {
                page,
                rows,
                total_number,
                list,
            },
        })
    }
}


export const batchDownshelf = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.goods.GOODS_BATCH_DOWNSHELF,
            params,
        })
    }
}


export const batchUpshelf = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.goods.GOODS_BATCH_UPSHELF,
            params,
        })
    }
}
