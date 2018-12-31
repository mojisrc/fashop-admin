import {
    takeEvery,
    call,
    put
} from 'redux-saga/effects'
import { Fetch } from '../../utils'
import types from '../../constants';
import { message } from 'antd';
import {
    saveShopInfo,
} from '../../actions/shop';
import { ShopApi } from "../../config/api/shop";

function* getShopInfo() {
    const e = yield call(Fetch.fetch, { api: ShopApi.info })
    if (e.code === 0) {
        yield put(saveShopInfo({ result: e.result }))
    } else {
        message.warning(e.msg)
    }
}

function* editShopInfo({ params }) {
    const e = yield call(Fetch.fetch, { api: ShopApi.setBaseInfo, params })
    if (e.code === 0) {
        message.success('修改成功！')
        yield call(getShopInfo)
    } else {
        message.warning(e.msg)
    }
}

function* editIndexInfo({ params }) {
    const e = yield call(Fetch.fetch, { api: ShopApi.setIndexInfo, params })
    if (e.code === 0) {
        message.success('修改成功！')
        yield call(getShopInfo)
    } else {
        message.warning(e.msg)
    }
}

function* editGoodsCategoryStyle({ params }) {
    const e = yield call(Fetch.fetch, { api: ShopApi.setGoodsCategoryStyle, params })
    if (e.code === 0) {
        message.success('成功启用！')
        yield call(getShopInfo)
    } else {
        message.warning(e.msg)
    }
}

function* editShopColorScheme({ params }) {
    const e = yield call(Fetch.fetch, { api: ShopApi.setColorScheme, params })
    if (e.code === 0) {
        message.success('操作成功！')
        yield call(getShopInfo)
    } else {
        message.warning(e.msg)
    }
}

function* editPortalTemplate({ params }) {
    const e = yield call(Fetch.fetch, { api: ShopApi.setPortalTemplate, params })
    if (e.code === 0) {
        message.success('操作成功！')
        yield call(getShopInfo)
    } else {
        message.warning(e.msg)
    }
}

export default function* rootSaga() {
    yield takeEvery(types.shop.GET_SHOP_INFO, getShopInfo)
    yield takeEvery(types.shop.EDIT_SHOP_INFO, editShopInfo)
    yield takeEvery(types.shop.EDIT_INDEX_INFO, editIndexInfo)
    yield takeEvery(types.shop.EDIT_GOODS_CATEGORY_STYLE, editGoodsCategoryStyle)
    yield takeEvery(types.shop.EDIT_SHOP_COLOR_SCHEME, editShopColorScheme)
    yield takeEvery(types.shop.EDIT_PORTAL_TEMPLATE, editPortalTemplate)
}
