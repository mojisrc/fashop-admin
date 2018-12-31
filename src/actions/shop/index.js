import types from '../../constants';

export const getShopInfo = ()=>{
    return dispatch => {
        dispatch({
            type : types.shop.GET_SHOP_INFO,
        })
    }
}

export const saveShopInfo = ({result})=>{
    return dispatch => {
        dispatch({
            type: types.shop.SAVE_SHOP_INFO,
            shopInfo:result,
        })
    }
}

export const editShopInfo = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.shop.EDIT_SHOP_INFO,
            params
        })
    }
}

export const editIndexInfo = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.shop.EDIT_INDEX_INFO,
            params
        })
    }
}

export const editGoodsCategoryStyle = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.shop.EDIT_GOODS_CATEGORY_STYLE,
            params
        })
    }
}

export const editShopColorScheme = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.shop.EDIT_SHOP_COLOR_SCHEME,
            params
        })
    }
}

export const editPortalTemplate = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.shop.EDIT_PORTAL_TEMPLATE,
            params
        })
    }
}
