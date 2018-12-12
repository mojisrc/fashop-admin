import { Fetch } from "../utils/index";
import { FreightApi } from "../config/api/freight";

export default {
  namespace: "freight",

  state: {
    list: []
  },

  effects: {
    * list({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.freight.get_freight_list,
          params
        });
      };
    },
    * info({ payload }, { call, put }) {
      return Fetch.fetch({ api: FreightApi.info, params });
    },

    * setLis(state, action) {
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
          type: types.freight.set_freight_list,
          data: {
            page,
            rows,
            total_number,
            list
          }
        });
      };
    },

    * setInfo(state, action) {
      return dispatch => {
        dispatch({
          type: types.freight.set_freight_info,
          result
        });
      };
    },

    * add({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.freight.add_freight,
          params
        });
      };
    },


    * edit({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.freight.edit_freight,
          params
        });
      };
    },


    * del({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.freight.del_freight,
          params
        });
      };
    },


    * list({ payload }, { call, put }) {
      yield put({
        type: types.freight.START_GET_FREIGHT_LIST
      });
      const e = yield call(Fetch.fetch, { api: FreightApi.list, params });
      if (e.code === 0) {
        yield put(setList({ result: e.result, params }));
      } else {
        message.warning(e.msg);
      }
    },

    * info({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: FreightApi.info, params });
      if (e.code === 0) {
        yield put(setInfo({ result: e.result }));
      } else {
        message.warning(e.msg);
      }
    },

    * add({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: FreightApi.info, params });
      if (e.code === 0) {
        message.success("保存成功", 1);
      } else {
        message.warning(e.msg);
      }
    },

    * edit({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: FreightApi.edit, params });
      if (e.code === 0) {
        yield call(list, { params: {} });
        message.success("保存成功", 1);
      } else {
        message.warning(e.msg);
      }
    },

    * del({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: FreightApi.del, params });
      if (e.code === 0) {
        message.success("已删除", 1);
        const { page, rows } = yield select(({ view: { freight: { listData: { page, rows } } } }) => ({ page, rows }));
        yield call(list, { params: { page, rows } });
        const { list } = yield select(({ view: { freight: { listData: { list } } } }) => ({ list }));
        if (list.length === 0 && page > 1) {
          yield call(list, { params: { page: page - 1, rows } });
        }
      } else {
        message.warning(e.msg);
      }
    }
  }, reducers: {
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
