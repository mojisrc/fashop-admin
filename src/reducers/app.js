import types from '../constants';
import { fetchStatus } from "ws-web-utils";

const initialState = {
    collapsed: false,
    showBootPage: false,
    showFetchLoading: false,
    initUserInfoStorageState: false,
    appBasisData: null,
    appBasisDataFetchStatus: fetchStatus.l,
    imageList: {
        page: 1,
        rows: 18,
        total_number: 0,
        list: [],
        loading: true,
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.app.UPDATE_FIRST_OPEN:
            return Object.assign({}, state, {
                showBootPage: action.data,
            })
        case types.app.UPDATE_FETCH_LOADING:
            return Object.assign({}, state, {
                showFetchLoading: action.data,
            })
        case types.app.INIT_USERINFO_STORAGE:
            return Object.assign({}, state, {
                initUserInfoStorageState: true,
            })
        case types.app.APP_BASIS_DATA:
            return Object.assign({}, state, {
                appBasisData: action.data,
                appBasisDataFetchStatus: action.fetchStatus,
            })
        case types.app.SET_SIDER_COLLAPSE:
            return Object.assign({}, state, {
                collapsed: action.collapsed,
            })
        case types.app.SET_GOODS_IMAGE_LIST:
            return Object.assign({}, state, {
                imageList: action.data,
            })
        default:
            return state;
    }
}
