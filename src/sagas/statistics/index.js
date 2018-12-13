import {
    takeEvery,
    call,
    put,
} from 'redux-saga/effects';
import { Fetch } from '@/utils';
import types from '../../constants';
import { message } from 'antd';
import {
    getDataInfor,
    getChartData,
    getSaleAccumulative,
    getDayAverage
} from '../../actions/statistics';
import { StatisticsApi } from "../../config/api/statistics";

function* sendInforFun() {
    const e = yield call(Fetch.fetch, { api: StatisticsApi.quantity })
    if (e.code === 0) {
        yield put(getDataInfor({ result: e.result.info }))
    } else {
        message.warning(e.msg)
    }
}

function* monthSaleChart({ params }) {
    const e = yield call(Fetch.fetch, { api: StatisticsApi.monthSalesHistogram, params })
    if (e.code === 0) {
        yield put(getChartData({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* sendOrdermouth({ params }) {
    console.log(params)
    console.log('月订单')
    const e = yield call(Fetch.fetch, { api: StatisticsApi.monthOrderCountHistogram, params })
    if (e.code === 0) {
        yield put(getChartData({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* sendAddUser({ params }) {
    console.log(params)
    console.log('客户增量')
    const e = yield call(Fetch.fetch, { api: StatisticsApi.monthUserAddCountHistogram, params })
    if (e.code === 0) {
        yield put(getChartData({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* sendNewUserConsu({ params }) {
    console.log(params)
    console.log('新客户消费')
    const e = yield call(Fetch.fetch, { api: StatisticsApi.monthNewUserSalesHistogram, params })
    if (e.code === 0) {
        yield put(getChartData({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* sendAccumulative({ params }) {
    const e = yield call(Fetch.fetch, { api: StatisticsApi.saleAccumulativeAmount, params })
    if (e.code === 0) {
        yield put(getSaleAccumulative({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* sendAversge({ params }) {
    const e = yield call(Fetch.fetch, { api: StatisticsApi.dayAverage, params })
    if (e.code === 0) {
        yield put(getDayAverage({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.statistics.DATAINFORMATION_SURVEY, sendInforFun)
    yield takeEvery(types.statistics.MONTH_SALE_CHART, monthSaleChart)
    yield takeEvery(types.statistics.BARGRAPHMONTHLY_SURVEY, sendOrdermouth)
    yield takeEvery(types.statistics.BARGRAPHCUST_SURVEY, sendAddUser)
    yield takeEvery(types.statistics.BARGRAPHNEWCUST_SURVEY, sendNewUserConsu)
    yield takeEvery(types.statistics.SALEACCUMULATIVE_SURVEY, sendAccumulative)
    yield takeEvery(types.statistics.SALEDAYAVERAGE_SURVEY, sendAversge)
}
