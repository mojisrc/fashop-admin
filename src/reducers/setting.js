import types from '../constants';

const initialState = {
    areaList: [],
    sceneList: [],
    getInfo: [],
    freightList: []
}


export default (state = initialState, action) => {
    switch (action.type) {
        case types.setting.SET_AREA_LIST:
            return Object.assign({}, state, {
                areaList: action.list,
            })
        case types.setting.CREEIVESMSLIST_SETTING:
            return Object.assign({}, state, {
                sceneList: action.list,
            })
        case types.setting.GETSMSCENEINFO_SETTING:
            return Object.assign({}, state, {
                getInfo: action.info
            })

        case types.setting.SET_FREIGHT_LIST:
            return Object.assign({}, state, {
                freightList: action.list,
            })
        default:
            return state;
    }
}
