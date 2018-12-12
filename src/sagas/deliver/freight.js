import { takeEvery, call, put, select } from 'redux-saga/effects'
import { Fetch} from '../../utils'
import types from '../../constants';
import { setList, setInfo } from '../../models/freight'
import { message } from 'antd';
import { FreightApi } from "../../config/api/freight";

function* list({ params }) {
    yield put({
        type: types.freight.START_GET_FREIGHT_LIST
    })
    const e = yield call(Fetch.fetch, { api: FreightApi.list, params })
    if (e.code === 0) {
        yield put(setList({ result: e.result, params }))
    } else {
        message.warning(e.msg)
    }
}

function* info({ params }) {
    const e = yield call(Fetch.fetch, { api: FreightApi.info, params })
    if (e.code === 0) {
        yield put(setInfo({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* add({ params }) {
    const e = yield call(Fetch.fetch, { api: FreightApi.info, params })
    if (e.code === 0) {
        message.success('保存成功', 1);
    } else {
        message.warning(e.msg)
    }
}

function* edit({ params }) {
    const e = yield call(Fetch.fetch, { api: FreightApi.edit, params })
    if (e.code === 0) {
        yield call(list, { params: {} })
        message.success('保存成功', 1);
    } else {
        message.warning(e.msg)
    }
}

function* del({ params }) {
    const e = yield call(Fetch.fetch, { api: FreightApi.del, params })
    if (e.code === 0) {
        message.success('已删除', 1);
        const { page, rows } = yield select(({ view: { freight: { listData: { page, rows } } } }) => ({ page, rows }))
        yield call(list, { params: { page, rows } })
        const { list } = yield select(({ view: { freight: { listData: { list } } } }) => ({ list }))
        if (list.length === 0 && page > 1) {
            yield call(list, { params: { page: page - 1, rows } })
        }
    } else {
        message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.freight.GET_FREIGHT_LIST, list)
    yield takeEvery(types.freight.GET_FREIGHT_INFO, info)
    yield takeEvery(types.freight.ADD_FREIGHT, add)
    yield takeEvery(types.freight.EDIT_FREIGHT, edit)
    yield takeEvery(types.freight.DEL_FREIGHT, del)
}
