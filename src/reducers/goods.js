//'use strict';
import types from '../constants';
import { fetchStatus } from "ws-web-utils";

const initialState = {
    loading: false,
    listData: {
        page: 1,
        rows: 20,
        total_number: 0,
        list: [],
    },
    specList: [],
    specListFetchStatus: fetchStatus.l,
    ifSpecCategoryShow: true,
    specShowList: [{}, {}],
    list: [],
    categoryTree:[],
    categoryList: [],
    data: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.goods.GET_ALL_SPEC:
            return Object.assign({}, state, {
                specList: action.specList,
                specListFetchStatus: action.specListFetchStatus
            })
        case types.goods.ADD_NEW_SPEC:
            return Object.assign({}, state, {
                specList: action.specList,
                specListFetchStatus: action.specListFetchStatus
            })
        case types.goods.IF_SPEC_SHOW:
            return Object.assign({}, state, {
                ifSpecCategoryShow: action.ifSpecCategoryShow,
            })
        case types.goods.ADD_SPEC_SHOW:
            return Object.assign({}, state, {
                specShowList: action.specShowList,
            })
        case types.goods.DELETE_SPEC_SHOW:
            return Object.assign({}, state, {
                specShowList: action.specShowList,
            })
        case types.goods.START_GET_GOODS_LIST:
            return Object.assign({}, state, {
                loading: true
            })
        case types.goods.SET_GOODS_LIST:
            return Object.assign({}, state, {
                listData: action.data,
                loading: false,
            })
        // 详情
        case types.goods.SET_GOODS_DETAIL_DATA:
            return Object.assign({}, state, {
                data: action.data,
            })
        // 分类
        case types.goods.START_GET_GOODS_CATEGORY_LIST:
            return Object.assign({}, state, {
                loading: true
            })
        case types.goods.SET_GOODS_CATEGORY_LIST:
            return Object.assign({}, state, {
                categoryTree: action.categoryTree,
                categoryList: action.categoryList,
                loading: false,
            })
        // 规格
        case types.goods.SET_GOODS_SPEC_LIST:
            return Object.assign({}, state, {
                specList: action.list,
            })
        default:
            return state;
    }
}
