import { stringify } from "qs";

import Model from "@/utils/model";
const options = {
  namespace: "member",
  api: [
    {
      request: "GET /server/member/self",
      response: { result: { info:{}} }
    }
  ],
  state: {},
  effects: {},
  reducers: {},
  subscriptions: {
    setup({ dispatch, history }) {
      const token = JSON.parse(localStorage.getItem("token"));
      if (history.location.pathname.indexOf("login") > -1 && token !== null) {
        dispatch({
          type: "member/logout"
        });
      }
    }
  }
};

export default Model.getInstance(options).create();

