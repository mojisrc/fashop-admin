import { takeEvery, call, put, select } from 'redux-saga/effects'
import { Fetch} from '../../utils'
import types from '../../constants';
import { setFreightList, setFreightInfo } from '../../actions/deliver/freight'
import { message } from 'antd';
import { FreightApi } from "../../config/api/freight";

function* getFreightList({ params }) {
    yield put({
        type: types.freight.START_GET_FREIGHT_LIST
    })
    const e = yield call(Fetch.fetch, { api: FreightApi.list, params })
    if (e.code === 0) {
        yield put(setFreightList({ result: e.result, params }))
    } else {
        message.warning(e.msg)
    }
}

function* getFreightInfo({ params }) {
    const e = yield call(Fetch.fetch, { api: FreightApi.info, params })
    if (e.code === 0) {
        yield put(setFreightInfo({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* addFreight({ params }) {
    const e = yield call(Fetch.fetch, { api: FreightApi.info, params })
    if (e.code === 0) {
        message.success('保存成功', 1);
    } else {
        message.warning(e.msg)
    }
}

function* editFreight({ params }) {
    const e = yield call(Fetch.fetch, { api: FreightApi.edit, params })
    if (e.code === 0) {
        yield call(getFreightList, { params: {} })
        message.success('保存成功', 1);
    } else {
        message.warning(e.msg)
    }
}

function* delFreight({ params }) {
    const e = yield call(Fetch.fetch, { api: FreightApi.del, params })
    if (e.code === 0) {
        message.success('已删除', 1);
        const { page, rows } = yield select(({ view: { freight: { listData: { page, rows } } } }) => ({ page, rows }))
        yield call(getFreightList, { params: { page, rows } })
        const { list } = yield select(({ view: { freight: { listData: { list } } } }) => ({ list }))
        if (list.length === 0 && page > 1) {
            yield call(getFreightList, { params: { page: page - 1, rows } })
        }
    } else {
        message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.freight.GET_FREIGHT_LIST, getFreightList)
    yield takeEvery(types.freight.GET_FREIGHT_INFO, getFreightInfo)
    yield takeEvery(types.freight.ADD_FREIGHT, addFreight)
    yield takeEvery(types.freight.EDIT_FREIGHT, editFreight)
    yield takeEvery(types.freight.DEL_FREIGHT, delFreight)
}
