import Fetch from "@/utils/fetch";
import { PageApi } from "@/config/api/page";

export default {
  namespace: "page",

  state: {
    list: []
  },

  effects: {
    * list({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.shop.get_shop_page_list,
          params
        });
      };
    },

    * saveList(state, action) {
      const { page, rows } = params;
      const { total_number, list } = result;
      return dispatch => {
        dispatch({
          type: types.shop.save_shop_page_list,
          shopPageList: {
            page,
            rows,
            total_number,
            list
          }
        });
      };
    },


    * add({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.shop.add_shop_page,
          params
        });
      };
    },

    * edit({ payload }, { call, put }) {
      return dispatch => {
        dispatch({
          type: types.shop.edit_shop_page,
          params
        });
      };
    },


    * info({ payload }, { call, put }) {
      return Fetch.fetch({ api: PageApi.info, params });
    },

    * saveInfo(state, action) {
      return dispatch => {
        dispatch({
          type: types.shop.set_shop_page_info,
          shopPageInfo: result
        });
      };
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
}
