// @flow
import types from '../../constants';
import { message } from "antd";
import { storageModule, Fetch } from '../../utils';
import { MemberApi } from "../../config/api/member";
// todo 这个是什么？
type userInfoType = {
    id: number,
    phone: number,
    avatar: string,
    email: string,
    nickname: string,
    username: string,
    access_token: string,
    rules: Array<string>,
}


/**
 * 登录方法
 **/
export const userLogin = ({ info }: { info: userInfoType }) => {
    //整理用户信息
    const userInfo = manageUserInfo(info)
    //登录后需要处理的方法
    userLoginOutFunc(userInfo)
    //设置登录状态
    return setUserStatus({
        login: true,
        userInfo
    })
}


/**
 * 退出登录方法
 **/
export const userSignOut = () => {
    // userSignOutFunc()
    return setUserStatus({
        login: false,
        userInfo: null,
    })
}

export const initAccessToken = ({ userInfo }: { userInfo: string }) => {
    return setUserStatus({
        login: true,
        userInfo: JSON.parse(userInfo),
    })
}

/**
 * 初始化检查用户登录
 **/
export const initUserInfoStorage = ({ userInfo }: { userInfo: string }) => {
    return setUserStatus({
        login: true,
        userInfo: JSON.parse(userInfo),
    })
}


/**
 * 更新用户信息
 **/
export const updateUserInfo = ({ callback }) => {
    return dispatch => {
        dispatch({
            type: types.member.UPDATE_USER_INFO_LOADING,
            refreshing: true,
        })

        Fetch.fetch("USERGETUSERINFO")
            .then((e) => {
                if (e.errcode === 0) {
                    dispatch(updateUserInfoFunc(e.data))
                    callback && callback()
                } else {
                    message.fail("获取用户最新数据异常");
                    dispatch({
                        type: types.member.UPDATE_USER_INFO_LOADING,
                        refreshing: false,
                    })
                }
            })

    }
}


/**
 * 修改用户信息
 **/
export const modifyUserInfo = (params, callback) => {
    return dispatch => {
        Fetch.fetch(MemberApi.selfEdit, params)
            .then((e) => {
                if (e.errcode === 0) {
                    message.info('修改成功', 1)
                    dispatch(updateUserInfoFunc(e.data))
                    callback && callback()
                } else {
                    message.offline(e.errmsg)
                }
            })
    }
}


/**
 * 被动修改用户信息
 **/
export const passiveModifyUserInfo = ({ data, callback }) => {
    return dispatch => {
        dispatch(updateUserInfoFunc(data))
        callback && callback()
    }
}


//登录后需要处理的方法
const userLoginOutFunc = (userInfo) => {
    storageModule.setUserInfo(userInfo)
}


//退出登录后需要处理的方法
const userSignOutFunc = () => {
    storageModule.removeUserInfo()
}


//管理用户数据
const manageUserInfo = (info: userInfoType) => {
    return {
        user_id: info.id,
        phone: info.phone,
        avatar: info.avatar,
        email: info.email,
        nickname: info.nickname,
        username: info.username,
        access_token: info.access_token,
        rules: info.rules,
    }
}


// 设置用户状态
const setUserStatus = ({ login, userInfo }: { login: boolean, userInfo: null | {} }) => ({
    type: types.member.USER_STATUS_CHANGE,
    login,
    userInfo,
})


// 更新用户信息方法
const updateUserInfoFunc = (e) => {
    const userInfo = manageUserInfo(e)
    userLoginOutFunc(userInfo)
    return {
        type: types.member.UPDATE_USER_INFO,
        userInfo: userInfo,
        refreshing: false,
    }
}


export const editSelfAvatar = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.member.MEMBER_SELF_EDIT,
            params
        })
    }
}


export const setUserinfos = ({ userinfos }) => {
    return dispatch => {
        dispatch({
            type: types.member.SENDREDUCER_USERINFO,
            userinfos
        })
    }
}
