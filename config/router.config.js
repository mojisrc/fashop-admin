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
                    { path: "/shop", redirect: "/shop/info" },
                    { path: "/shop/info", name: "基本信息", component: "/shop/info" },
                    { path: "/shop/page", name: "制作页面", component: "/shop/page/list" },
                    { path: "/shop/page/add",  component: "/shop/page/add" },
                    { path: "/shop/page/edit", component: "/shop/page/edit" },
                    { path: "/shop/category", name: "分类页面",component: "/shop/category" },
                ]
            },
            {
                path: "/order",
                name: "订单",
                routes: [
                    { path: "/order", redirect: "/order/list" },
                    { path: "/order/list", name: "订单管理", component: "/order/list" },
                    { path: "/order/list/detail", component: "/order/detail" },
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
                    { path: "/setting/index", name: "配送设置", component: "/setting/index" },
                    { path: "/setting/order", name: "订单设置", component: "/setting/order" },
                    { path: "/setting/payment", name: "支付设置", component: "/setting/payment" }
                ]
            }
        ]
    }
];
