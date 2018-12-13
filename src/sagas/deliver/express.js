import { takeEvery, call, put, select } from 'redux-saga/effects'
import { Fetch } from '@/utils'
import types from '../../constants';
import { saveList, saveInfo } from '../../models/express'
import { message } from 'antd';
import { goBack } from 'react-router-redux'
import { ExpressApi } from "../../config/api/express";

function* list({ params }) {
    yield put({
        type: types.express.START_GET_EXPRESS_LIST
    })
    const e = yield call(Fetch.fetch, { api: ExpressApi.list, params })
    if (e.code === 0) {
        yield put(saveList({ result: e.result, params }))
    } else {
        message.warning(e.msg)
    }
}

function* info({ params }) {
    const e = yield call(Fetch.fetch, { api: ExpressApi.info, params })
    if (e.code === 0) {
        yield put(saveInfo({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* add({ params }) {
    const e = yield call(Fetch.fetch, { api: ExpressApi.add, params })
    if (e.code === 0) {
        message.success('添加成功', 1);
        yield put(goBack())
    } else {
        message.warning(e.msg)
    }
}

function* edit({ params }) {
    const e = yield call(Fetch.fetch, { api: ExpressApi.edit, params })
    if (e.code === 0) {
        yield call(list, { params: {} })
        message.success('保存成功', 1);
        yield put(goBack())
    } else {
        message.warning(e.msg)
    }
}

function* del({ params }) {
    const e = yield call(Fetch.fetch, { api: ExpressApi.del, params })
    if (e.code === 0) {
        message.success('已删除', 1);
        const { page, rows } = yield select(({ view: { express: { listData: { page, rows } } } }) => ({ page, rows }))
        yield call(list, { params: { page, rows } })
        const { list } = yield select(({ view: { express: { listData: { list } } } }) => ({ list }))
        if (list.length === 0 && page > 1) {
            yield call(list, { params: { page: page - 1, rows } })
        }
    } else {
        message.warning(e.msg)
    }
}

function* setIsCommonlyUse({ params }) {
    const e = yield call(Fetch.fetch, { api: ExpressApi.setCommonlyUse, params })
    if (e.code === 0) {
        message.success('已设置', 1);
        const { page, rows } = yield select(({ view: { express: { listData: { page, rows } } } }) => ({ page, rows }))
        yield call(list, { params: { page, rows } })
        const { list } = yield select(({ view: { express: { listData: { list } } } }) => ({ list }))
        if (list.length === 0 && page > 1) {
            yield call(list, { params: { page: page - 1, rows } })
        }
    } else {
        message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.express.GET_EXPRESS_LIST, list)
    yield takeEvery(types.express.GET_EXPRESS_INFO, info)
    yield takeEvery(types.express.ADD_EXPRESS, add)
    yield takeEvery(types.express.EDIT_EXPRESS, edit)
    yield takeEvery(types.express.DEL_EXPRESS, del)
    yield takeEvery(types.express.SET_EXPRESS_IS_COMMONLY_USE, setIsCommonlyUse)
}
