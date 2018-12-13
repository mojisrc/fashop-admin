import {
    takeEvery,
    call,
    put,
} from 'redux-saga/effects'
import { Fetch } from '@/utils'
import types from '../../constants';
import { message } from 'antd';
import {
    saveList,
    savePageSystemList,
    saveInfo,
} from '../../models/decorate';
import { PageApi } from "../../config/api/page";
import { goBack } from "react-router-redux";

function* list({ params }) {
    yield put({
        type: types.shop.START_GET_SHOP_PAGE_LIST
    })
    const e = yield call(Fetch.fetch, { api: PageApi.list, params })
    if (e.code === 0) {
        if (params.is_system) {
            yield put(savePageSystemList({ result: e.result, params }))
        } else {
            yield put(saveList({ result: e.result, params }))
        }
    } else {
        message.warning(e.msg)
    }
}

function* info({ params }) {
    const e = yield call(Fetch.fetch, { api: PageApi.info, params })
    if (e.code === 0) {
        yield put(saveInfo({ result: e.result }))
        // yield select(state => state.view.shop.shopPageInfo)
    } else {
        message.warning(e.msg)
    }
}

function* setPagePortal({ params }) {
    const e = yield call(Fetch.fetch, { api: PageApi.setPortal, params })
    if (e.code === 0) {
        yield call(list, { params: {} })
    } else {
        message.warning(e.msg)
    }
}

function* add({ params }) {
    // 过滤空goods
    let { body } = params
    const index = body.findIndex((item) => item.type === 'goods' && item.data.length === 0)
    if(index !== -1){
        body.splice(index, 1);
        params.body = body
    }

    const e = yield call(Fetch.fetch, { api: PageApi.add, params })
    if (e.code === 0) {
        message.success('保存成功', 1);
        yield put(goBack())
    } else {
        message.warning(e.msg)
    }
}

function* edit({ params }) {
    // 过滤空goods
    let { body } = params
    const index = body.findIndex((item) => item.type === 'goods' && item.data.length === 0)
    if(index !== -1){
        body.splice(index, 1);
        params.body = body
    }


    const e = yield call(Fetch.fetch, { api: PageApi.edit, params })
    if (e.code === 0) {
        message.success('保存成功', 1);
    } else {
        message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.shop.GET_SHOP_PAGE_LIST, list)
    yield takeEvery(types.shop.GET_SHOP_PAGE_INFO, info)
    yield takeEvery(types.shop.SET_SHOP_PAGE_PORTAL, setPagePortal)
    yield takeEvery(types.shop.ADD_SHOP_PAGE, add)
    yield takeEvery(types.shop.EDIT_SHOP_PAGE, edit)
}
