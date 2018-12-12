import { Fetch } from "../utils/index";
import { ExpressApi } from "../config/api/express";

export default {
  namespace: "express",
  state: {
    list: []
  },
  effects: {
    * list({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.express.get_express_list,
          params
        });
      };
    },
    * info({ payload }, { call, put }) {
      return Fetch.fetch({ api: ExpressApi.info, params });
    },
    * saveLis(state, action) {
      return dispatch => {
        const {
          page,
          rows
        } = params;
        const {
          total_number,
          list
        } = result;
        dispatch({
          type: types.express.set_express_list,
          data: {
            page,
            rows,
            total_number,
            list
          }
        });
      };
    },
    * saveInfo(state, action) {
      return dispatch => {
        dispatch({
          type: types.express.set_express_info,
          data: result
        });
      };
    },
    * add({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.express.add_express,
          params
        });
      };
    },
    * edit({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.express.edit_express,
          params
        });
      };
    },
    * del({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.express.del_express,
          params
        });
      };
    },
    * setIsCommonlyUse({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.express.set_express_is_commonly_use,
          params
        });
      };
    },
    * list({ payload }, { call, put }) {
      yield put({
        type: types.express.START_GET_EXPRESS_LIST
      });
      const e = yield call(Fetch.fetch, { api: ExpressApi.list, params });
      if (e.code === 0) {
        yield put(saveList({ result: e.result, params }));
      } else {
        message.warning(e.msg);
      }
    },
    * info({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: ExpressApi.info, params });
      if (e.code === 0) {
        yield put(saveInfo({ result: e.result }));
      } else {
        message.warning(e.msg);
      }
    },
    * add({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: ExpressApi.add, params });
      if (e.code === 0) {
        message.success("添加成功", 1);
        yield put(goBack());
      } else {
        message.warning(e.msg);
      }
    },
    * edit({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: ExpressApi.edit, params });
      if (e.code === 0) {
        yield call(list, { params: {} });
        message.success("保存成功", 1);
        yield put(goBack());
      } else {
        message.warning(e.msg);
      }
    },
    * del({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: ExpressApi.del, params });
      if (e.code === 0) {
        message.success("已删除", 1);
        const { page, rows } = yield select(({ view: { express: { listData: { page, rows } } } }) => ({ page, rows }));
        yield call(list, { params: { page, rows } });
        const { list } = yield select(({ view: { express: { listData: { list } } } }) => ({ list }));
        if (list.length === 0 && page > 1) {
          yield call(list, { params: { page: page - 1, rows } });
        }
      } else {
        message.warning(e.msg);
      }
    },
    * setIsCommonlyUse({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: ExpressApi.setCommonlyUse, params });
      if (e.code === 0) {
        message.success("已设置", 1);
        const { page, rows } = yield select(({ view: { express: { listData: { page, rows } } } }) => ({ page, rows }));
        yield call(list, { params: { page, rows } });
        const { list } = yield select(({ view: { express: { listData: { list } } } }) => ({ list }));
        if (list.length === 0 && page > 1) {
          yield call(list, { params: { page: page - 1, rows } });
        }
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
    }
    ,
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload)
      };
    }
  }
};
