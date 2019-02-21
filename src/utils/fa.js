import request from "@/utils/request";
import Query from "@/utils/query";
import qs from "qs";

export default {
    query: new Query(),
    async request(options) {
        const url = `${options.url}${Object.keys(options.data).length > 0 && options.method === "GET" ? (options.url.indexOf("?") === -1 ? "?" : "&") + qs.stringify(options.data) : ""}`;
        const token = JSON.parse(localStorage.getItem("token")) ?? null;

        const data = {
            method: options.method,
            ...(options.method === "GET") ? {} : { body: options.data },
            ...(token === null ? {} : { headers: { "Access-Token": token.accessToken } })
        };
        const result = await request(url, data);
        if (result.code === 10005) {
            window.g_app._store.dispatch({
                type: "member/logout"
            });
        } else {
            return result;
        }
    },
};
