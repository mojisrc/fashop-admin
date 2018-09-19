import { takeEvery, call, put, select } from 'redux-saga/effects'
import { Fetch } from '../../utils'
import types from '../../constants';
import { setShipperList, setShipperInfo } from '../../actions/deliver/shipper'
import { message } from 'antd';
import { goBack } from 'react-router-redux'
import { ShipperApi } from "../../config/api/shipper";

function* getShipperList({ params }) {
    yield put({
        type: types.shipper.START_GET_SHIPPER_LIST
    })
    const e = yield call(Fetch.fetch, { api: ShipperApi.list, params })
    if (e.code === 0) {
        yield put(setShipperList({ result: e.result, params }))
    } else {
        message.warning(e.msg)
    }
}

function* getShipperInfo({ params }) {
    const e = yield call(Fetch.fetch, { api: ShipperApi.info, params })
    if (e.code === 0) {
        yield put(setShipperInfo({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* addShipper({ params }) {
    const e = yield call(Fetch.fetch, { api: ShipperApi.add, params })
    if (e.code === 0) {
        message.success('添加成功', 1);
        yield put(goBack())
    } else {
        message.warning(e.msg)
    }
}

function* editShipper({ params }) {
    const e = yield call(Fetch.fetch, { api: ShipperApi.edit, params })
    if (e.code === 0) {
        yield call(getShipperList, { params: {} })
        message.success('保存成功', 1);
        yield put(goBack())
    } else {
        message.warning(e.msg)
    }
}

function* delShipper({ params }) {
    const e = yield call(Fetch.fetch, { api: ShipperApi.del, params })
    if (e.code === 0) {
        message.success('已删除', 1);
        const { page, rows } = yield select(({ view: { shipper: { listData: { page, rows } } } }) => ({ page, rows }))
        yield call(getShipperList, { params: { page, rows } })
        const { list } = yield select(({ view: { shipper: { listData: { list } } } }) => ({ list }))
        if (list.length === 0 && page > 1) {
            yield call(getShipperList, { params: { page: page - 1, rows } })
        }
    } else {
        message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.shipper.GET_SHIPPER_LIST, getShipperList)
    yield takeEvery(types.shipper.GET_SHIPPER_INFO, getShipperInfo)
    yield takeEvery(types.shipper.ADD_SHIPPER, addShipper)
    yield takeEvery(types.shipper.EDIT_SHIPPER, editShipper)
    yield takeEvery(types.shipper.DEL_SHIPPER, delShipper)
}
