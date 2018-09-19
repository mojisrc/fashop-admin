import types from '../../constants';
import { Fetch, fetchStatus } from "../../utils";
import { PageApi } from "../../config/api/page";

export const getShopPageList = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.shop.GET_SHOP_PAGE_LIST,
            params
        })
    }
}

export const saveShopPageList = ({ result, params }) => {
    const { page, rows } = params
    const { total_number, list } = result
    return dispatch => {
        dispatch({
            type: types.shop.SAVE_SHOP_PAGE_LIST,
            shopPageList: {
                page,
                rows,
                total_number,
                list
            }
        })
    }
}

export const saveShopPageSystemList = ({ result, params }) => {
    const { page, rows } = params
    const { total_number, list } = result
    return dispatch => {
        dispatch({
            type: types.shop.SAVE_SHOP_PAGE_SYSTEM_LIST,
            shopPageSystemList: {
                page,
                rows,
                total_number,
                list
            }
        })
    }
}

export const setShopPagePortal = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.shop.SET_SHOP_PAGE_PORTAL,
            params
        })
    }
}

export const addShopPage = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.shop.ADD_SHOP_PAGE,
            params
        })
    }
}

export const editShopPage = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.shop.EDIT_SHOP_PAGE,
            params
        })
    }
}

export const getShopPageInfo = ({ params }) => {
    return Fetch.fetch({ api: PageApi.info, params })
}
// TODO完善top
// export const saveShopPageInfo = ({ result }) => {
//     const { info } = result
//     return dispatch => {
//         dispatch(setDiyData({
//             options: {
//                 type: info.body[0]['type'],
//                 index: 0,
//             },
//             body:info.body
//         }))
//     }
// }
export const saveShopPageInfo = ({ result }) => {
    return dispatch => {
        dispatch({
            type: types.shop.SET_SHOP_PAGE_INFO,
            shopPageInfo: result
        })
    }
}

// diy店铺
export const setDiyData = ({ options, body }) => {
    return dispatch => {
        dispatch({
            type: types.shop.SET_SHOP_PAGE_INFO,
            shopDiyOptions: options,
            shopDiyBody: body
        })
    }
}
