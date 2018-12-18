export default [
    // user
    {
        path: "/login",
        component: "../layouts/userLayout",
        routes: [
            { path: "/login", component: "/user/login" }
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
                    { path: "/shop/page/add", component: "/shop/page/add" },
                    { path: "/shop/page/edit", component: "/shop/page/edit" },
                    { path: "/shop/page/demo", component: "/shop/page/demo" },
                    { path: "/shop/category", name: "分类页面", component: "/shop/category" }
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
                    { path: "/goods/category", name: "分类管理", component: "/goods/category" },
                    { path: "/goods/category/add", component: "/goods/category/add" },
                    { path: "/goods/category/edit", component: "/goods/category/edit" }
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
                    { path: "/setting", redirect: "/setting/deliver/shipper" },
                    {
                        path: "/setting/deliver",
                        name: "配送设置",
                        component: "/setting/deliverLayout",
                        routes: [
                            { path: "/setting/deliver", redirect: "/setting/deliver/shipper" },
                            { path: "/setting/deliver/shipper", component: "/setting/shipper/list" },
                            { path: "/setting/deliver/express", component: "/setting/express/list" },
                            { path: "/setting/deliver/freight", component: "/setting/freight/list" }
                        ]

                    },
                    { path: "/setting/order", name: "订单设置", component: "/setting/order" },
                    { path: "/setting/payment", name: "支付设置", component: "/setting/payment" }
                ]
            },
            {
                path: "/marketing",
                name: "营销",
                routes: [
                    { path: "/marketing", redirect: "/marketing/coupon/list" },
                    { path: "/marketing/coupon", redirect: "/marketing/coupon/list" },
                    { path: "/marketing/coupon/list", name: "优惠券", component: "/marketing/coupon/list" },
                    { path: "/marketing/freebie", redirect: "/marketing/freebie/list" },
                    { path: "/marketing/freebie/list", name: "赠品", component: "/marketing/freebie/list" },
                ]
            }
        ]
    }
];
