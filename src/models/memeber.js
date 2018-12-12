import { message } from "antd";
import { storageModule, Fetch } from "../utils/index";
import { MemberApi } from "../config/api/member";

export default {
  namespace: "member",

  state: {
    list: []
  },

  effects: {

    /**
     * 登录方法
     **/* userLogin({ info }: { info }) {
      //整理用户信息
      const userInfo = manageUserInfo(info);
      //登录后需要处理的方法
      userLoginOutFunc(userInfo);
      //设置登录状态
      return setUserStatus({
        login: true,
        userInfo
      });
    }


    /**
     * 退出登录方法
     **/* userSignOut() {
      // userSignOutFunc()
      return setUserStatus({
        login: false,
        userInfo: null
      });
    }

    * initAccessToken({ userInfo }) {
      return setUserStatus({
        login: true,
        userInfo: JSON.parse(userInfo)
      });
    }

    /**
     * 初始化检查用户登录
     **/* initUserInfoStorage({ userInfo }) {
      return setUserStatus({
        login: true,
        userInfo: JSON.parse(userInfo)
      });
    }


    /**
     * 修改用户信息
     **/* modifyUserInfo(params, callback) {
      return dispatch => {
        Fetch.fetch(MemberApi.selfEdit, params)
          .then((e) => {
            if (e.errcode === 0) {
              message.info("修改成功", 1);
              dispatch(updateUserInfoFunc(e.data));
              callback && callback();
            } else {
              message.offline(e.errmsg);
            }
          });
      };
    },


    /**
     * 被动修改用户信息
     **/* passiveModifyUserInfo({ data, callback }) {
      return dispatch => {
        dispatch(updateUserInfoFunc(data));
        callback && callback();
      };
    },


//登录后需要处理的方法
    userLoginOutFunc(userInfo) {
      storageModule.setUserInfo(userInfo);
    },


//退出登录后需要处理的方法
    userSignOutFunc() {
      storageModule.removeUserInfo();
    },


//管理用户数据
    manageUserInfo(info) {
      return {
        user_id: info.id,
        phone: info.phone,
        avatar: info.avatar,
        email: info.email,
        nickname: info.nickname,
        username: info.username,
        access_token: info.access_token,
        rules: info.rules
      };
    },


    * editSelfAvatar({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.member.MEMBER_SELF_EDIT,
          params
        });
      };
    },


    * setUserinfos({ userinfos }) {
      return dispatch => {
        dispatch({
          type: types.member.SENDREDUCER_USERINFO,
          userinfos
        });
      };
    },
    * self({ access_token }) {
      yield put({
        type: types.member.USER_STATUS_CHANGE,
        login: false,
        userInfo: {
          access_token
        }
      });
      const e = yield call(Fetch.fetch, { api: MemberApi.self });
      if (e.code === 0) {
        const {
          info,
          rules
        } = e.result;
        yield put(userLogin({ info: Object.assign({}, info, { access_token, rules }) }));
        yield put(replace("/"));
        yield call(loginAfter);
      } else {
        message.warning(e.msg);
      }
    },

    * login({ payload }, { call, put }) {
      yield put({ type: types.member.FETCH_LOGIN_LOADING, loading: true });
      const e = yield call(Fetch.fetch, { api: MemberApi.login, params });
      if (e.code === 0) {
        const { access_token } = e.result;
        yield call(self, { access_token });
      } else {
        message.warning(e.msg);
      }
      yield put({
        type: types.member.FETCH_LOGIN_LOADING,
        loading: false
      });
    },


    * logout() {
      const e = yield call(Fetch.fetch, { api: MemberApi.logout });
      if (e.code === 0) {
        yield put(userSignOut());
        yield put(replace("/member/login"));
      } else {
        message.warning(e.msg);
      }
    },

    * storage() {
      // todo 需要重构 太乱了
      const userInfo = storageModule.info();
      if (userInfo) {
        yield put(initUserInfoStorage({ userInfo }));
        yield put({ type: types.app.INIT_USERINFO_STORAGE });
        if (userInfo["access_token"] !== "undefined") {
          const e = yield call(Fetch.fetch, { api: MemberApi.token });
          if (e.code === 0) {
            const { access_token } = e.result;
            yield call(update, { access_token });
            yield put(initUserInfoStorage({ userInfo }));
            yield call(loginAfter);
          } else {
            yield put(userSignOut());
            yield put(replace("/member/login"));
          }
        } else {
          yield put(userSignOut());
          yield put(replace("/member/login"));
        }
      } else {
        yield put({ type: types.app.INIT_USERINFO_STORAGE });
        yield put(userSignOut());
        yield put(replace("/member/login"));
      }
    },

    * update({ access_token }) {
      const e = yield call(Fetch.fetch, { api: MemberApi.self });
      if (e.code === 0) {
        const {
          info,
          rules
        } = e.result;
        yield put(userLogin({ info: Object.assign({}, info, { access_token, rules }) }));
      } else {
        message.warning(e.msg);
      }
    },


    * retrievePassword({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: "USEREDITPASSWORDBYFIND", params });
      if (e.code === 0) {
        message.success("找回密码成功");
        yield put(push(`/member/login`));
      } else {
        message.warning(e.msg);
      }
    }

    * changePassword({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: "USEREDITPASSWORD", params });
      if (e.code === 0) {
        message.success("修改密码成功");
        yield put(push(`/`));
      } else {
        message.warning(e.msg);
      }
    },

    * loginAfter() {
      yield put(getRuleTree());
    }

    * selfEdit({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: MemberApi.selfEdit, params });
      if (e.code === 0) {
        message.success("修改头像成功");
      } else {
        message.warning(e.msg);
      }
    },

    * getUserinfo() {
      const e = yield call(Fetch.fetch, { api: MemberApi.self });
      const userInfos = e.result.info;
      if (e.code === 0) {
        yield put(setUserinfos({ userInfos }));
      } else {
        message.warning(e.msg);
      }
    }


  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload)
      };
    }
  }
};
