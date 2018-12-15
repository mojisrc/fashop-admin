export default [
    // user
    {
        path: "/user",
        component: "../layouts/userLayout",
        routes: [
            { path: "/user", redirect: "/user/login" },
            { path: "/user/login", component: "./user/login" }
        ]
    },
    // app
    {
        path: "/",
        component: "../layouts/basicLayout",
        Routes: ["src/pages/authorized"],
        authority: ["admin", "user"],
        routes: [
            // dashboard
            { path: "/", redirect: "/dashboard/analysis" },
            {
                path: "/dashboard/analysis",
                name: "概况",
                component: "./dashboard/analysis"
            },
            {
                path: "/shop",
                name: "店铺",
                routes: [
                    { path: "/shop", redirect: "/order/list" },
                    { path: "/shop/decorate", name: "店铺装修", component: "/shop/decorate" },
                    { path: "/shop/setting", name: "店铺设置", component: "/shop/setting" }
                ]
            },
            {
                path: "/order",
                name: "订单",
                routes: [
                    { path: "/order", redirect: "/order/list" },
                    { path: "/order/list", name: "订单管理", component: "/order/list" },
                    { path: "/order/detail", component: "/order/detail" },
                    { path: "/order/evaluate", name: "评价管理", component: "/order/evaluate" },
                    { path: "/order/refund", name: "退款售后", component: "/order/refund" },
                    { path: "/order/refundEdit", component: "/order/refundEdit" },
                    { path: "/order/send", component: "/order/send" }
                ]
            },
            {
                path: "/goods",
                name: "商品",
                routes: [
                    { path: "/goods", redirect: "/goods/list" },
                    { path: "/goods/list", name: "商品管理", component: "/goods/list" },
                    { path: "/goods/category", name: "分类管理", component: "/goods/category" }
                ]
            },
            {
                path: "/user",
                name: "客户",
                routes: [
                    { path: "/user", redirect: "/user/list" },
                    { path: "/user/list", name: "客户管理", component: "/user/list" }
                ]
            },
            {
                path: "/setting",
                name: "设置",
                routes: [
                    { path: "/setting", redirect: "/setting/index" },
                    { path: "/setting/shipper", name: "设置", component: "/setting/index" },
                    { path: "/setting/shipper", name: "配送设置", component: "/setting/shipper" },
                    { path: "/setting/order", name: "订单设置", component: "/setting/order" },
                    { path: "/setting/payment", name: "支付设置", component: "/setting/payment" }
                ]
            }
        ]
    }
];
