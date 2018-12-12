import { Fetch } from "../utils/index";
import { ArticleApi } from "../config/api/article";

export default {
  namespace: "article",
  state: {
    list: [],
    info:[]
  },
  effects: {
    * list({ payload }, { call, put }) {
      return Fetch.fetch({ api: ArticleApi.list, params });
    },

    * info({ payload }, { call, put }) {
      return Fetch.fetch({ api: ArticleApi.info, params });
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
