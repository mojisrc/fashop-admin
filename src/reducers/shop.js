import types from '../constants';

const initialState = {
    shopInfo:{},
    shopPageInfo: {
        info: {}
    },
    shopPageInfoLoading: false,
    shopPageListLoading: false,
    shopPageList: {},
    shopPageSystemList: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.shop.SAVE_SHOP_INFO:
            return Object.assign({}, state, {
                shopInfo: action.shopInfo,
            })
        case types.shop.SET_SHOP_PAGE_INFO:
            return Object.assign({}, state, {
                shopPageInfo: action.shopPageInfo,
                shopPageInfoLoading: true,
            })
        case types.shop.START_GET_SHOP_PAGE_LIST:
            return Object.assign({}, state, {
                shopPageListLoading: true,
            })
        case types.shop.SAVE_SHOP_PAGE_LIST:
            return Object.assign({}, state, {
                shopPageList: action.shopPageList,
                shopPageListLoading: false,
            })
        case types.shop.SAVE_SHOP_PAGE_SYSTEM_LIST:
            return Object.assign({}, state, {
                shopPageSystemList: action.shopPageSystemList,
                shopPageListLoading: false,
            })
        default:
            return state;
    }
}
