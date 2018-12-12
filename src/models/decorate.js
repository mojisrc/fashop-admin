import { Fetch, fetchStatus } from "../utils/index";
import { PageApi } from "../config/api/page";

export default {
  namespace: "decorate",

  state: {
    list: []
  },
  effects: {
    * savePageSystemList(state, action) {
      const { page, rows } = params;
      const { total_number, list } = result;
      return dispatch => {
        dispatch({
          type: types.shop.save_shop_page_system_list,
          shopPageSystemList: {
            page,
            rows,
            total_number,
            list
          }
        });
      };
    },
    * setPagePortal(state, action) {
      return dispatch => {
        dispatch({
          type: types.shop.set_shop_page_portal,
          params
        });
      };
    },
    * setDiyData(state, action) {
      return dispatch => {
        dispatch({
          type: types.shop.set_shop_page_info,
          shopDiyOptions: options,
          shopDiyBody: body
        });
      };
    },
    * list({ payload }, { call, put }) {
      yield put({
        type: types.shop.START_GET_SHOP_PAGE_LIST
      });
      const e = yield call(Fetch.fetch, { api: PageApi.list, params });
      if (e.code === 0) {
        if (params.is_system) {
          yield put(savePageSystemList({ result: e.result, params }));
        } else {
          yield put(saveList({ result: e.result, params }));
        }
      } else {
        message.warning(e.msg);
      }
    },
    * info({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: PageApi.info, params });
      if (e.code === 0) {
        yield put(saveInfo({ result: e.result }));
        // yield select(state => state.view.shop.shopPageInfo)
      } else {
        message.warning(e.msg);
      }
    },
    * setPagePortal({ payload }, { call, put }) {
      const e = yield call(Fetch.fetch, { api: PageApi.setPortal, params });
      if (e.code === 0) {
        yield call(list, { params: {} });
      } else {
        message.warning(e.msg);
      }
    },
    * add({ payload }, { call, put }) {
      // 过滤空goods
      let { body } = params;
      const index = body.findIndex((item) => item.type === "goods" && item.data.length === 0);
      if (index !== -1) {
        body.splice(index, 1);
        params.body = body;
      }

      const e = yield call(Fetch.fetch, { api: PageApi.add, params });
      if (e.code === 0) {
        message.success("保存成功", 1);
        yield put(goBack());
      } else {
        message.warning(e.msg);
      }
    },
    * edit({ payload }, { call, put }) {
      // 过滤空goods
      let { body } = params;
      const index = body.findIndex((item) => item.type === "goods" && item.data.length === 0);
      if (index !== -1) {
        body.splice(index, 1);
        params.body = body;
      }


      const e = yield call(Fetch.fetch, { api: PageApi.edit, params });
      if (e.code === 0) {
        message.success("保存成功", 1);
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
