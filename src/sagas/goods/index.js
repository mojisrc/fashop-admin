import { takeEvery, call, put, select } from 'redux-saga/effects'
import { Fetch } from '@/utils'
import types from '../../constants';
import { message } from 'antd';
import { setList } from '../../models/goods';
import { GoodsApi } from "../../config/api/goods";

function* getList({ params }) {
    yield put({
        type: types.goods.START_GET_GOODS_LIST
    })
    const e = yield call(Fetch.fetch, { api: GoodsApi.list, params })
    if (e.code === 0) {
        const {
            result
        } = e
        yield put(setList({
            params,
            result
        }))
    } else {
        message.warning(e.msg)
    }
}


function* batchDownshelf({ params }) {
    const e = yield call(Fetch.fetch, { api: GoodsApi.batchDownshelf, params })
    if (e.code === 0) {
        message.success('操作成功')
        const listParams = yield select(({ view: { goods: { listData: { page, rows } } } }) => ({
            page,
            rows
        }))
        yield call(getList, { params: listParams })
    } else {
        message.warning(e.msg)
    }
}


function* batchUpshelf({ params }) {
    const e = yield call(Fetch.fetch, { api: GoodsApi.batchUpshelf, params })
    if (e.code === 0) {
        message.success('操作成功')
        const listParams = yield select(({ view: { goods: { listData: { page, rows } } } }) => ({
            page,
            rows
        }))
        // yield put(goBack())
        yield call(getList, { params: listParams })
    } else {
        message.warning(e.msg)
    }
}


export default function* rootSaga() {
    yield takeEvery(types.goods.GET_GOODS_LIST, getList)
    yield takeEvery(types.goods.GOODS_BATCH_DOWNSHELF, batchDownshelf)
    yield takeEvery(types.goods.GOODS_BATCH_UPSHELF, batchUpshelf)

}
