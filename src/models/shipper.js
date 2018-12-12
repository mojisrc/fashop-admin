import { Fetch } from "../utils/index";
import { ShipperApi } from "../config/api/shipper";

export default {
  namespace: "shipper",

  state: {
    list: []
  },

  effects: {
    * list({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.shipper.get_shipper_list,
          params
        });
      };
    },

    * info({ payload }, { call, put }) {
      return Fetch.fetch({ api: ShipperApi.info, params });
    },

    * setList({ params, result }) {
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
          type: types.shipper.set_shipper_list,
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
          type: types.shipper.set_shipper_info,
          data: result
        });
      };
    },

    * add({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.shipper.add_shipper,
          params
        });
      };
    },


    * edit({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.shipper.edit_shipper,
          params
        });
      };
    },


    * del({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.shipper.del_shipper,
          params
        });
      };
    },

    * list({ payload }, { call, put }) {
      yield put({
        type: types.shipper.START_GET_SHIPPER_LIST
      });
      const e = yield call(Fetch.fetch, { api: ShipperApi.list, params });
      if (e.code === 0) {
        yield put(setList({ result: e.result, params }));
      } else {
        message.warning(e.msg);
      }
    },

    * info({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: ShipperApi.info, params });
      if (e.code === 0) {
        yield put(setInfo({ result: e.result }));
      } else {
        message.warning(e.msg);
      }
    },

    * add({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: ShipperApi.add, params });
      if (e.code === 0) {
        message.success("添加成功", 1);
        yield put(goBack());
      } else {
        message.warning(e.msg);
      }
    },

    * edit({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: ShipperApi.edit, params });
      if (e.code === 0) {
        yield call(list, { params: {} });
        message.success("保存成功", 1);
        yield put(goBack());
      } else {
        message.warning(e.msg);
      }
    },

    * del({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: ShipperApi.del, params });
      if (e.code === 0) {
        message.success("已删除", 1);
        const { page, rows } = yield select(({ view: { shipper: { listData: { page, rows } } } }) => ({ page, rows }));
        yield call(list, { params: { page, rows } });
        const { list } = yield select(({ view: { shipper: { listData: { list } } } }) => ({ list }));
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
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload)
      };
    }
  }
};
