import { takeEvery, call, put, } from 'redux-saga/effects'
import { Fetch, storageModule } from '../../utils'
import { userLogin, initUserInfoStorage, userSignOut, setUserinfos } from '../../actions/member'
import types from '../../constants';
import { replace, push } from 'react-router-redux'
import { message } from 'antd';
import { getRuleTree } from "../../actions/auth"
import { MemberApi } from "../../config/api/member";

function* self({ access_token }) {
    yield put({
        type: types.member.USER_STATUS_CHANGE,
        login: false,
        userInfo: {
            access_token
        }
    })
    const e = yield call(Fetch.fetch, { api: MemberApi.self })
    if (e.code === 0) {
        const {
            info,
            rules,
        } = e.result
        yield put(userLogin({ info: Object.assign({}, info, { access_token, rules }) }))
        yield put(replace('/'))
        yield call(loginAfter)
    } else {
        message.warning(e.msg)
    }
}

function* login({ params }) {
    yield put({type: types.member.FETCH_LOGIN_LOADING, loading: true})
    const e = yield call(Fetch.fetch, { api: MemberApi.login, params })
    if (e.code === 0) {
        const { access_token } = e.result
        yield call(self, { access_token })
    } else {
        message.warning(e.msg)
    }
    yield put({
        type: types.member.FETCH_LOGIN_LOADING,
        loading: false
    })
}


function* logout() {
    const e = yield call(Fetch.fetch, { api: MemberApi.logout })
    if (e.code === 0) {
        yield put(userSignOut())
        yield put(replace('/member/login'))
    } else {
        message.warning(e.msg)
    }
}

function* storage() {
    // todo 需要重构 太乱了
    const userInfo = storageModule.getUserInfo()
    if(userInfo){
        yield put(initUserInfoStorage({ userInfo }))
        yield put({ type: types.app.INIT_USERINFO_STORAGE })
        if (userInfo['access_token'] !== "undefined") {
            const e = yield call(Fetch.fetch, { api: MemberApi.token })
            if (e.code === 0) {
                const { access_token } = e.result
                yield call(update, { access_token })
                yield put(initUserInfoStorage({ userInfo }))
                yield call(loginAfter)
            } else {
                yield put(userSignOut())
                yield put(replace('/member/login'))
            }
        } else {
            yield put(userSignOut())
            yield put(replace('/member/login'))
        }
    }else{
        yield put({ type: types.app.INIT_USERINFO_STORAGE })
        yield put(userSignOut())
        yield put(replace('/member/login'))
    }
}

function* update({ access_token }) {
    const e = yield call(Fetch.fetch, { api: MemberApi.self })
    if (e.code === 0) {
        const {
            info,
            rules,
        } = e.result
        yield put(userLogin({ info: Object.assign({}, info, { access_token, rules }) }))
    } else {
        message.warning(e.msg)
    }
}


function* retrievePassword({ params }) {
    const e = yield call(Fetch.fetch, { api: 'USEREDITPASSWORDBYFIND', params })
    if (e.code === 0) {
        message.success('找回密码成功')
        yield put(push(`/member/login`))
    } else {
        message.warning(e.msg)
    }
}

function* changePassword({ params }) {
    const e = yield call(Fetch.fetch, { api: 'USEREDITPASSWORD', params })
    if (e.code === 0) {
        message.success('修改密码成功')
        yield put(push(`/`))
    } else {
        message.warning(e.msg)
    }
}

function* loginAfter() {
    yield put(getRuleTree())
}

function* selfEdit({ params }) {
    const e = yield call(Fetch.fetch, { api: MemberApi.selfEdit, params })
    if (e.code === 0) {
        message.success('修改头像成功')
    } else {
        message.warning(e.msg)
    }
}

function* getUserinfo() {
    const e = yield call(Fetch.fetch, { api: MemberApi.self })
    const userInfos = e.result.info
    if (e.code === 0) {
        yield put(setUserinfos({ userInfos }))
    } else {
        message.warning(e.msg)
    }
}


export default function* rootSaga() {
    yield takeEvery(types.member.USER_LOGIN, login)
    yield takeEvery(types.member.USER_SIGN_OUT, logout)
    yield takeEvery(types.member.INIT_USER_INFO_STORAGE, storage)
    yield takeEvery(types.member.EDIT_PASSWORD_BYFIND, retrievePassword)
    yield takeEvery(types.member.EDIT_PASSWORD, changePassword)
    yield takeEvery(types.member.MEMBER_SELF_EDIT, selfEdit)
    yield takeEvery(types.member.GETUSERINFO_USERINFO, getUserinfo)
}
