export default {
  namespace: "auth",
  state: {
    list: []
  },
  effects: {
    * setRuleTree(e) {
      return dispatch => {
        let list = [];
        const newArray = e.map((item) => {
          const newItem = { ...item };
          delete newItem._child;
          list.push(newItem);
          const newArray2 = item._child.map((tom) => {
            delete tom._child;
            list.push(tom);
          });
        });
        dispatch({
          type: types.auth.set_rule_tree,
          authTree: e,
          authTreeMap: list
        });
      };
    },
    * getRuleTree() {
      return dispatch => {
        dispatch({
          type: types.auth.get_rule_tree
        });
      };
    },


    * startGetMemberList() {
      return dispatch => {
        dispatch({
          type: types.member.member_list_loading
        });
      };
    },


    * getMemberList() {
      return dispatch => {
        dispatch({
          type: types.member.get_member_list
        });
      };
    },


    * setMemberList({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.member.set_member_list,
          data
        });
      };
    },


    * addMemberButtonLoading({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.member.member_add_start,
          loading
        });
      };
    },


    * editMemberButtonLoading({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.member.member_edit_start,
          loading
        });
      };
    },


    * delMember({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.member.member_del,
          params: { id }
        });
      };
    },


    * groupList() {
      const e = yield call(Fetch.fetch, { api: AuthApi.groupList, params: { rows: 1000 } });
      if (e.code === 0) {
        yield put({
          type: types.auth.SET_AUTH_GROUPLIST,
          data: e.result.list
        });
      } else {
        message.warning(e.msg);
      }
    },

    * groupMemberList({ payload }, { call, put }) {
      yield put({
        type: types.auth.GROUP_MEMBER_LIST_LOADING
      });
      const e = yield call(Fetch.fetch, { api: AuthApi.groupMemberList, params });
      if (e.code === 0) {
        yield put({
          type: types.auth.SET_AUTH_GROUP_MEMBER_LIST,
          data: e.result.list
        });
      } else {
        message.warning(e.msg);
      }
    },


    * groupEdit({ id, name, func }) {
      const e = yield call(Fetch.fetch, { api: AuthApi.groupEdit, params: { id, name } });
      if (e.code === 0) {
        yield call(func);
        yield call(groupList);
      } else {
        message.warning(e.msg);
      }
    },


    * getRuleTree() {
      const e = yield call(Fetch.fetch, { api: AuthApi.ruleTree });
      if (e.code === 0) {
        yield put(setRuleTree(e.result.tree));
      } else {
        // 禁止弹出msg为空的错误。。
        // message.warning(e.msg)
      }
    },


    * memberList() {
      yield put(getMemberList());
      const e = yield call(Fetch.fetch, { api: MemberApi.list });
      if (e.code === 0) {
        yield put(setMemberList({
          data: e.result
        }));
      } else {
        message.warning(e.msg);
      }
    },


    * addMember({ params, func }) {
      yield put(addMemberButtonLoading({
        loading: true
      }));
      try {
        const e = yield call(Fetch.fetch, { api: MemberApi.add, params });
        if (e.code === 0) {
          message.success("添加成功");
          yield call(func);
          yield call(memberList);
        } else {
          message.warning(e.msg);
        }
        yield put(addMemberButtonLoading({
          loading: false
        }));
      } catch (err) {
        message.error(err.toString());
      }
    },


    * editMember({ params, func }) {
      yield put(editMemberButtonLoading({
        loading: true
      }));
      try {
        const e = yield call(Fetch.fetch, { api: MemberApi.edit, params });
        if (e.code === 0) {
          message.success("修改成功");
          yield call(func);
          yield call(memberList);
        } else {
          message.warning(e.msg);
        }
        yield put(editMemberButtonLoading({
          loading: false
        }));
      } catch (err) {
        message.error(err.toString());
      }
    },


    * memberDel({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: MemberApi.del, params });
      if (e.code === 0) {
        message.info("已删除");
        yield call(memberList);
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
