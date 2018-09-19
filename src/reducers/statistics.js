import types from '../constants';

const initialState = {
    statisticsDatainfor:[],
    satisticsChart:[],
    saleAccumulative:[],
    saleAverage:[]
}

export default (state = initialState,action) => {
    switch (action.type) {
        case types.statistics.GETDATAINFORMATION_SURVEY:
            return Object.assign({}, state, {
                statisticsDatainfor: action.dataInfor,
            })
        case types.statistics.GET_MONTH_SALE_CHART:
            return Object.assign({}, state, {
                satisticsChart: action.saleInfo,
            })
        case types.statistics.GET_SALEACCUMULATIVE_SURVEY:
            return Object.assign({}, state, {
                saleAccumulative: action.accumulativeCount,
            })
        case types.statistics.GETSALEDAYAVERAGE_SURVEY:
            return Object.assign({}, state, {
                saleAverage: action.saleDayAver,
            })
        default:
            return state;
    }
}
