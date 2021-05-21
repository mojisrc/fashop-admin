import express from "@/services/express";

export default {
    namespace: "priceStockInfo",
    state: {
        info: []
    },
    effects: {
    },
    reducers: {
       clear: (state) => { return {info: []}},
       set: (state, payload) => { return {info: payload.data}},
    }
};
