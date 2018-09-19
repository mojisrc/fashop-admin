import { takeEvery, call, put, select } from 'redux-saga/effects'
import { Fetch } from '../../utils'
import types from '../../constants';
import { setExpressList, setExpressInfo } from '../../actions/deliver/express'
import { message } from 'antd';
import { goBack } from 'react-router-redux'
import { ExpressApi } from "../../config/api/express";

function* getExpressList({ params }) {
    yield put({
        type: types.express.START_GET_EXPRESS_LIST
    })
    const e = yield call(Fetch.fetch, { api: ExpressApi.list, params })
    if (e.code === 0) {
        yield put(setExpressList({ result: e.result, params }))
    } else {
        message.warning(e.msg)
    }
}

function* getExpressInfo({ params }) {
    const e = yield call(Fetch.fetch, { api: ExpressApi.info, params })
    if (e.code === 0) {
        yield put(setExpressInfo({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* addExpress({ params }) {
    const e = yield call(Fetch.fetch, { api: ExpressApi.add, params })
    if (e.code === 0) {
        message.success('添加成功', 1);
        yield put(goBack())
    } else {
        message.warning(e.msg)
    }
}

function* editExpress({ params }) {
    const e = yield call(Fetch.fetch, { api: ExpressApi.edit, params })
    if (e.code === 0) {
        yield call(getExpressList, { params: {} })
        message.success('保存成功', 1);
        yield put(goBack())
    } else {
        message.warning(e.msg)
    }
}

function* delExpress({ params }) {
    const e = yield call(Fetch.fetch, { api: ExpressApi.del, params })
    if (e.code === 0) {
        message.success('已删除', 1);
        const { page, rows } = yield select(({ view: { express: { listData: { page, rows } } } }) => ({ page, rows }))
        yield call(getExpressList, { params: { page, rows } })
        const { list } = yield select(({ view: { express: { listData: { list } } } }) => ({ list }))
        if (list.length === 0 && page > 1) {
            yield call(getExpressList, { params: { page: page - 1, rows } })
        }
    } else {
        message.warning(e.msg)
    }
}

function* setExpressIsCommonlyUse({ params }) {
    const e = yield call(Fetch.fetch, { api: ExpressApi.setCommonlyUse, params })
    if (e.code === 0) {
        message.success('已设置', 1);
        const { page, rows } = yield select(({ view: { express: { listData: { page, rows } } } }) => ({ page, rows }))
        yield call(getExpressList, { params: { page, rows } })
        const { list } = yield select(({ view: { express: { listData: { list } } } }) => ({ list }))
        if (list.length === 0 && page > 1) {
            yield call(getExpressList, { params: { page: page - 1, rows } })
        }
    } else {
        message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.express.GET_EXPRESS_LIST, getExpressList)
    yield takeEvery(types.express.GET_EXPRESS_INFO, getExpressInfo)
    yield takeEvery(types.express.ADD_EXPRESS, addExpress)
    yield takeEvery(types.express.EDIT_EXPRESS, editExpress)
    yield takeEvery(types.express.DEL_EXPRESS, delExpress)
    yield takeEvery(types.express.SET_EXPRESS_IS_COMMONLY_USE, setExpressIsCommonlyUse)
}
