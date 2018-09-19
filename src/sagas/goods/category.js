import { takeEvery, call, put, } from 'redux-saga/effects'
import { Fetch } from '../../utils'
import types from '../../constants';
import { message } from 'antd';
import {
    setGoodsCategoryList,
} from '../../actions/goods/category';
import { goBack } from 'react-router-redux'
import { GoodsApi } from "../../config/api/goods";

// TODO 这里message的操作
function* getList() {
    yield put({
        type: types.goods.START_GET_GOODS_CATEGORY_LIST
    })
    const e = yield call(Fetch.fetch, { api: GoodsApi.category.list })
    if (e.code === 0) {
        const {
            list
        } = e.result
        yield put(setGoodsCategoryList({ list }))
    } else {
        message.warning(e.msg)
    }
}


function* addCategory({ params }) {
    const e = yield call(Fetch.fetch, { api: GoodsApi.category.add, params })
    if (e.code === 0) {
        message.success('添加成功')
        yield put(goBack())
    } else {
        message.warning(e.msg)
    }
}


function* editCategory({ params }) {
    const e = yield call(Fetch.fetch, { api: GoodsApi.category.edit, params })
    if (e.code === 0) {
        message.success('修改成功')
        yield put(goBack())
    } else {
        message.warning(e.msg)
    }
}


function* delCategory({ params }) {
    const e = yield call(Fetch.fetch, { api: GoodsApi.category.del, params })
    if (e.code === 0) {
        message.success('已删除')
        yield call(getList)
    } else {
        message.warning(e.msg)
    }
}


function* sortCategory({ params, func }) {
    const e = yield call(Fetch.fetch, { api: GoodsApi.category.sort, params })
    if (e.code === 0) {
        message.success('排序成功')
        yield call(func)
        yield call(getList)
    } else {
        message.warning(e.msg)
    }
}


export default function* rootSaga() {
    yield takeEvery(types.goods.GET_GOODS_CATEGORY_LIST, getList)
    yield takeEvery(types.goods.ADD_GOODS_CATEGORY, addCategory)
    yield takeEvery(types.goods.EDIT_GOODS_CATEGORY, editCategory)
    yield takeEvery(types.goods.DEL_GOODS_CATEGORY, delCategory)
    yield takeEvery(types.goods.SORT_GOODS_CATEGORY, sortCategory)

}
