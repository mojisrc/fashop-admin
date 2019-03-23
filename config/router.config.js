export default [
    {
        path: "/install",
        component: "install"
    },
    {
        path: "/login",
        component: "../layouts/userLayout",
        routes: [
            { path: "/login", component: "member/login" }
        ]
    },
    {
        path: "/",
        component: "../layouts/basicLayout",
        Routes: ["src/pages/authorized"],
        authority: ["admin", "user"],
        routes: [
            { path: "/", redirect: "dashboard/analysis" },
            {
                path: "/dashboard/analysis",
                name: "概况",
                component: "dashboard/analysis"
            },
            {
                path: "/shop",
                name: "店铺",
                routes: [
                    { path: "/shop", redirect: "/shop/info" },
                    { path: "/shop/info", name: "基本信息", component: "shop/info", policy: "shop/info" },
                    { path: "/shop/page", name: "制作页面", component: "shop/page/list", policy: "page/list && page/info" },
                    { path: "/shop/page/add", component: "shop/page/add", policy: "page/add" },
                    { path: "/shop/page/edit", component: "shop/page/edit", policy: "page/edit" },
                    { path: "/shop/page/demo", component: "shop/page/demo" },
                    {
                        path: "/shop/category",
                        name: "分类页面",
                        component: "shop/category",
                        policy: "shop/setGoodsCategoryStyle"
                    }
                ]
            },
            {
                path: "/order",
                name: "订单",
                routes: [
                    { path: "/order", redirect: "/order/list" },
                    { path: "/order/list", name: "订单管理", component: "order/list", policy: "order/list" },
                    { path: "/order/list/detail", component: "order/detail", policy: "order/detail" },
                    { path: "/order/refund", name: "退款售后", component: "order/refund", policy: "orderrefund/list" },
                    { path: "/order/evaluate", name: "评价管理", component: "order/evaluate", policy: "goodsevaluate/list" },
                    { path: "/order/refund/edit", component: "order/refundEdit", policy: "order/refundEdit" },
                    { path: "/order/list/send", component: "order/send", policy: "order/send" }
                ]
            },
            {
                path: "/goods",
                name: "商品",
                routes: [
                    { path: "/goods", redirect: "/goods/list"},
                    { path: "/goods/list", name: "商品管理", component: "goods/list", policy: "goods/list" },
                    { path: "/goods/list/add", component: "goods/add", policy: "goods/add" },
                    { path: "/goods/list/edit", component: "goods/edit", policy: "goods/edit" },
                    {
                        path: "/goods/category",
                        name: "分类管理",
                        component: "goods/category",
                        policy: "goodscategory/list"
                    },
                    { path: "/goods/category/add", component: "goods/category/add", policy: "goodscategory/add" },
                    { path: "/goods/category/edit", component: "goods/category/edit", policy: "goodscategory/edit" }
                ]
            },
            {
                path: "/user",
                name: "客户",
                routes: [
                    { path: "/user", redirect: "/user/list", policy: "user/list" },
                    { path: "/user/list", name: "客户管理", component: "user/list", policy: "user/list" },
                    { path: "/user/list/detail", component: "user/detail", policy: "user/detail" }
                ]
            },
            {
                path: "/member",
                routes: [
                    { path: "/member", redirect: "/member/self" },
                    { path: "/member/self", component: "member/self" }
                ]
            },
            {
                path: "/auth",
                name: "权限",
                routes: [
                    { path: "/auth", redirect: "auth/group" },
                    { path: "/auth/member", name: "用户", component: "auth/member", policy: "member/list" },
                    { path: "/auth/group", name: "用户组", component: "auth/group", policy: "auth/groupList" },
                    { path: "/auth/policy", name: "策略", component: "auth/policy", policy: "auth/policyList" }
                ]
            },
            {
                path: "/setting",
                name: "设置",
                routes: [
                    {
                        path: "/setting",
                        redirect: "/setting/deliver/shipper",
                        policy: "shipper/list || express/list || freight/list"
                    },
                    {
                        path: "/setting/deliver",
                        name: "物流配送",
                        component: "setting/deliverLayout",
                        routes: [
                            { path: "/setting/deliver", redirect: "/setting/deliver/shipper" },
                            { path: "/setting/deliver/shipper", component: "setting/shipper/list" },
                            { path: "/setting/deliver/shipper/add", component: "setting/shipper/add" },
                            { path: "/setting/deliver/shipper/edit", component: "setting/shipper/edit" },
                            { path: "/setting/deliver/express", component: "setting/express/list" },
                            { path: "/setting/deliver/express/add", component: "setting/express/add" },
                            { path: "/setting/deliver/express/edit", component: "setting/express/edit" },
                            { path: "/setting/deliver/freight", component: "setting/freight/list" },
                            { path: "/setting/deliver/freight/add", component: "setting/freight/add" },
                            { path: "/setting/deliver/freight/edit", component: "setting/freight/edit" }
                        ]
                    },
                    { path: "/setting/order", name: "订单配置", component: "setting/order" },
                    {
                        path: "/setting/wechat", name: "微信配置", component: "setting/wechat/layout",
                        routes: [
                            { path: "/setting/wechat", redirect: "/setting/wechat/base" },
                            { path: "/setting/wechat/base", component: "setting/wechat/base" },
                            { path: "/setting/wechat/miniTemplate", component: "setting/wechat/miniTemplate" }
                        ]
                    },
                    { path: "/setting/alipay", name: "支付宝配置", component: "setting/alipay" },
                    { path: "/setting/sms", name: "短信配置", component: "setting/sms" },
                    {
                        path: "/setting/poster", name: "海报配置", component: "setting/poster/layout",
                        routes: [
                            { path: "/setting/poster", redirect: "/setting/poster/goods" },
                            { path: "/setting/poster/goods", component: "setting/poster/goods" },
                            { path: "/setting/poster/groupGoods", component: "setting/poster/groupGoods" }
                        ]
                    }
                ]
            },
            {
                path: "/marketing",
                name: "营销",
                routes: [
                    { path: "/marketing", redirect: "/marketing/group" },
                    { path: "/marketing/group", name: "拼团", component: "marketing/group/list" },
                    { path: "/marketing/group/add", component: "marketing/group/add" },
                    { path: "/marketing/group/edit", component: "marketing/group/edit" },
                    { path: "/marketing/group/detail", component: "marketing/group/detail" },
                    { path: "/marketing/coupon", name: "优惠券", component: "marketing/coupon/list" },
                    { path: "/marketing/coupon/add", component: "marketing/coupon/add" },
                    { path: "/marketing/coupon/edit", component: "marketing/coupon/edit" },
                    { path: "/marketing/freebie", name: "赠品", component: "marketing/freebie/list" },
                    { path: "/marketing/freebie/add", component: "marketing/freebie/add" },
                    { path: "/marketing/freebie/edit", component: "marketing/freebie/edit" },
                    { path: "/marketing/discount", name: "限时折扣", component: "marketing/discount/list" },
                    { path: "/marketing/discount/add", component: "marketing/discount/add" },
                    { path: "/marketing/discount/edit", component: "marketing/discount/edit" }
                ]
            }
        ]
    }
];
