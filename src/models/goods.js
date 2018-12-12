import Fetch from "../utils/fetch";
import { GoodsApi } from "../config/api/goods";

export default {
  namespace: "goods",

  state: {
    list: []
  },

  effects: {
    * list({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.goods.get_goods_list,
          params
        });
      };
    },
    * info({ payload }, { call, put }) {
      return Fetch.fetch({ api: GoodsApi.info, params });
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
          type: types.goods.set_goods_list,
          data: {
            page,
            rows,
            total_number,
            list
          }
        });
      };
    },


    * batchDownshelf({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.goods.goods_batch_downshelf,
          params
        });
      };
    },


    * batchUpshelf({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.goods.goods_batch_upshelf,
          params
        });
      };
    },


    * setIsShowBootPage(e) {
      return dispatch => {
        dispatch({
          type: types.app.update_first_open,
          data: e
        });
      };
    },

    * setIsShowFetchLoading(e) {
      return dispatch => {
        dispatch({
          type: types.app.update_fetch_loading,
          data: e
        });
      };
    },
    * getList({ payload }, { call, put }) {
      yield put({
        type: types.goods.START_GET_GOODS_LIST
      });
      const e = yield call(Fetch.fetch, { api: GoodsApi.list, params });
      if (e.code === 0) {
        const {
          result
        } = e;
        yield put(setList({
          params,
          result
        }));
      } else {
        message.warning(e.msg);
      }
    },


    * batchDownshelf({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: GoodsApi.batchDownshelf, params });
      if (e.code === 0) {
        message.success("操作成功");
        const listParams = yield select(({ view: { goods: { listData: { page, rows } } } }) => ({
          page,
          rows
        }));
        yield call(getList, { params: listParams });
      } else {
        message.warning(e.msg);
      }
    },


    * batchUpshelf({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: GoodsApi.batchUpshelf, params });
      if (e.code === 0) {
        message.success("操作成功");
        const listParams = yield select(({ view: { goods: { listData: { page, rows } } } }) => ({
          page,
          rows
        }));
        // yield put(goBack())
        yield call(getList, { params: listParams });
      } else {
        message.warning(e.msg);
      }
    },
    * getList() {
      const e = yield call(Fetch.fetch, { api: GoodsApi.spec.list });
      if (e.code === 0) {
        const {
          list
        } = e.result;
        yield put(setSpecList({ list }));
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
