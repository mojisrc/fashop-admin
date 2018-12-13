import { takeEvery, call, put, select } from 'redux-saga/effects'
import { Fetch } from '@/utils'
import types from '../../constants';
import { setList, setInfo } from '../../models/shipper'
import { message } from 'antd';
import { goBack } from 'react-router-redux'
import { ShipperApi } from "../../config/api/shipper";

function* list({ params }) {
    yield put({
        type: types.shipper.START_GET_SHIPPER_LIST
    })
    const e = yield call(Fetch.fetch, { api: ShipperApi.list, params })
    if (e.code === 0) {
        yield put(setList({ result: e.result, params }))
    } else {
        message.warning(e.msg)
    }
}

function* info({ params }) {
    const e = yield call(Fetch.fetch, { api: ShipperApi.info, params })
    if (e.code === 0) {
        yield put(setInfo({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* add({ params }) {
    const e = yield call(Fetch.fetch, { api: ShipperApi.add, params })
    if (e.code === 0) {
        message.success('添加成功', 1);
        yield put(goBack())
    } else {
        message.warning(e.msg)
    }
}

function* edit({ params }) {
    const e = yield call(Fetch.fetch, { api: ShipperApi.edit, params })
    if (e.code === 0) {
        yield call(list, { params: {} })
        message.success('保存成功', 1);
        yield put(goBack())
    } else {
        message.warning(e.msg)
    }
}

function* del({ params }) {
    const e = yield call(Fetch.fetch, { api: ShipperApi.del, params })
    if (e.code === 0) {
        message.success('已删除', 1);
        const { page, rows } = yield select(({ view: { shipper: { listData: { page, rows } } } }) => ({ page, rows }))
        yield call(list, { params: { page, rows } })
        const { list } = yield select(({ view: { shipper: { listData: { list } } } }) => ({ list }))
        if (list.length === 0 && page > 1) {
            yield call(list, { params: { page: page - 1, rows } })
        }
    } else {
        message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.shipper.GET_SHIPPER_LIST, list)
    yield takeEvery(types.shipper.GET_SHIPPER_INFO, info)
    yield takeEvery(types.shipper.ADD_SHIPPER, add)
    yield takeEvery(types.shipper.EDIT_SHIPPER, edit)
    yield takeEvery(types.shipper.DEL_SHIPPER, del)
}
