export default {
  namespace: "role",

  state: {
    list: []
  },

  effects: {


    * addGroup({ params, func }) {
      return dispatch => {
        dispatch({
          type: types.auth.group_add,
          params,
          func
        });
      };
    },


    * groupList() {
      return dispatch => {
        dispatch({
          type: types.auth.get_auth_grouplist
        });
      };
    },


    * groupDel({ id, func }) {
      return dispatch => {
        dispatch({
          type: types.auth.group_del,
          params: {
            id
          },
          func
        });
      };
    },


    * groupMemberEdit({ id, member_ids, func }) {
      return dispatch => {
        dispatch({
          type: types.auth.group_member_edit,
          params: {
            id,
            member_ids
          },
          func
        });
      };
    },


    * groupMemberList({ params }) {
      return dispatch => {
        dispatch({
          type: types.auth.get_auth_group_member_list,
          params
        });
      };
    },


    * groupAuthInfo({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.auth.get_group_auth_info,
          params: {
            id
          }
        });
      };
    },


    * selectRuleids({ rule_ids }) {
      return dispatch => {
        const newArray = rule_ids || [];
        const newArray2 = newArray.map((e) => e);
        dispatch({
          type: types.auth.set_select_rule_ids,
          selectRuleids: newArray2
        });
      };
    },


    * saveAuthRuleids({ rule_ids, id }) {
      return dispatch => {
        dispatch({
          type: types.auth.save_auth_ruleids,
          params: {
            rule_ids,
            id
          },
          func: () => {
            dispatch(groupAuthInfo({
              id
            }));
          }
        });
      };
    },

    * groupAdd({ params, func }) {
      const e = yield call(Fetch.fetch, { api: AuthApi.groupAdd, params });
      if (e.code === 0) {
        yield call(func);
        yield put(groupList());
      } else {
        message.warning(e.msg);
      }
    },


    * groupDel({ params, func }) {
      const e = yield call(Fetch.fetch, { api: AuthApi.groupDel, params });
      if (e.code === 0) {
        yield call(func);
        yield put(groupList());
      } else {
        message.warning(e.msg);
      }
    },


    * groupMemberEdit({ params, func }) {
      const e = yield call(Fetch.fetch, { api: AuthApi.groupMemberEdit, params });
      if (e.code === 0) {
        yield call(func);
      } else {
        message.warning(e.msg);
      }
    },

    * groupAuthInfo({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: AuthApi.groupInfo, params });
      if (e.code === 0) {
        const {
          rule_ids
        } = e.result.info;
        yield put(selectRuleids({
          rule_ids
        }));
      } else {
        message.warning(e.msg);
      }
    },


    * saveAuthRuleids({ params, func }) {
      const e = yield call(Fetch.fetch, { api: AuthApi.groupAuthorise, params });
      if (e.code === 0) {
        message.success("保存成功");
        yield call(func);
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
