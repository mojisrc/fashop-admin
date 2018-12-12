import {
    takeEvery,
    call,
    put,
} from 'redux-saga/effects'
import { Fetch } from '../../utils'
import types from '../../constants';
import { message } from 'antd';
import {
    setAreaList,
    receiveSmslist,
    getInfoMessage
} from '../../actions/setting';
import { AreaApi } from "../../config/api/area";
import { SmsApi } from "../../config/api/sms";

// todo 改成AreaList
function* getList() {
    const e = yield call(Fetch.fetch, { api: AreaApi.list, params: { level: 2, tree: 1 } })
    if (e.code === 0) {
        const {
            list
        } = e.result
        yield put(setAreaList({ list }))
    } else {
        message.warning(e.msg)
    }
}

// todo  是啥
function* setpay({ params }) {
    const e = yield call(Fetch.fetch, { api: 'PAYSEETING', params })
    if (e.code === 0) {
        message.success('设置成功')
    } else {
        message.warning(e.msg)
    }
}

function* setSmsProvide({ params }) {
    const e = yield call(Fetch.fetch, { api: SmsApi.provider.edit, params })
    if (e.code === 0) {
        message.success('保存成功')
    } else {
        message.warning(e.msg)
    }
}

// todo 这是啥
function* settingSmscen() {
    const e = yield call(Fetch.fetch, { api: 'SMSSCEN' })
    if (e.code === 0) {
        const {
            list
        } = e.result
        yield put(receiveSmslist({ list }))
    } else {
        message.warning(e.msg)
    }
}

// todo 这是啥
function* sendSmsScence({ params }) {
    const e = yield call(Fetch.fetch, { api: SmsApi.scene.edit, params })
    if (e.code === 0) {
        message.success('保存成功')
    } else {
        message.warning(e.msg)
    }
}

function* sendSmsScenceInfo({ params }) {
    const e = yield call(Fetch.fetch, { api: SmsApi.scene.info, params })
    if (e.code === 0) {
        const { info } = e.result;
        yield put(getInfoMessage({ info }))
    } else {
        message.warning(e.msg)
    }
}
// todo 命名问题修改
export default function* rootSaga() {
    yield takeEvery(types.setting.GET_AREA_LIST, getList)
    yield takeEvery(types.setting.SETTING_PAY, setpay)
    yield takeEvery(types.setting.PSETTING_SMSPROVIDER, setSmsProvide)
    yield takeEvery(types.setting.SMSLIST_SETTING, settingSmscen)
    yield takeEvery(types.setting.SMSSCENCEEDIT_SEETING, sendSmsScence)
    yield takeEvery(types.setting.SMSSCENEINFO_SETTING, sendSmsScenceInfo)
}
