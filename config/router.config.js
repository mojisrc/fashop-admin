export default [
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
            { path: "/", redirect: "dashboard/analysis", policy: "statistics/quantity" },
            {
                path: "/dashboard/analysis",
                name: "概况",
                component: "dashboard/analysis",
                policy: "statistics/quantity"
            },
            {
                path: "/shop",
                name: "店铺",
                routes: [
                    {
                        path: "/shop/page", name: "专题页面", policy: "page/list && page/info",
                        routes: [
                            {
                                path: "/shop/page", component: "shop/page/layout",
                                routes: [
                                    { path: "/shop/page", redirect: "/shop/page/list", policy: "page/list" },
                                    { path: "/shop/page/list", component: "shop/page/list", policy: "page/list" },
                                    {
                                        path: "/shop/page/extra",
                                        component: "shop/page/extra",
                                        policy: "page/extraList"
                                    },
                                    { path: "/shop/page/add", component: "shop/page/add", policy: "page/add" },
                                    { path: "/shop/page/edit", component: "shop/page/edit", policy: "page/edit" },
                                ]
                            }


                        ]
                    },
                    {
                        path: "/shop/categoryPage",
                        name: "分类页面",
                        component: "shop/categoryPage/list",
                        policy: "categorypage/list"
                    },
                    { path: "/shop/categoryPage/add", component: "shop/categoryPage/add", policy: "categorypage/add" },
                    { path: "/shop/images", name: "图片空间", component: "shop/images", policy: "imagefolder/add" },
                    {
                        path: "/shop/categoryPage/edit",
                        component: "shop/categoryPage/edit",
                        policy: "categorypage/edit"
                    },
                ]
            },
            {
                path: "/order",
                name: "订单",
                component: "order/layout",
                routes: [
                    { path: "/order", redirect: "/order/list", policy: "order/list" },
                    { path: "/order/list", component: "order/list", policy: "order/list" },
                    { path: "/order/list/detail", component: "order/detail", policy: "order/detail" },
                    { path: "/order/refund", component: "order/refund", policy: "orderrefund/list" },
                    { path: "/order/evaluate", component: "order/evaluate", policy: "goodsevaluate/list" },
                    { path: "/order/refund/edit", component: "order/refundEdit", policy: "order/refundEdit" },
                    { path: "/order/list/send", component: "order/send", policy: "order/send" },
                    { path: "/order/list/print", component: "order/print", policy: "order/list" },
                ],
                policy: "order/list || orderrefund/list || order/evaluate"
            },
            {
                path: "/goods",
                name: "商品",
                component: "goods/layout",
                routes: [
                    { path: "/goods", redirect: "/goods/list" },
                    { path: "/goods/list", component: "goods/list", policy: "goods/list" },
                    { path: "/goods/list/add", component: "goods/add", policy: "goods/add" },
                    { path: "/goods/list/edit", component: "goods/edit", policy: "goods/edit" },
                    {
                        path: "/goods/category",
                        component: "goods/category",
                        policy: "goodscategory/list"
                    },
                    { path: "/goods/category/add", component: "goods/category/add", policy: "goodscategory/add" },
                    { path: "/goods/category/edit", component: "goods/category/edit", policy: "goodscategory/edit" },
                    { path: "/goods/tag", component: "goods/tag", policy: "goodstag/list" },
                    { path: "/goods/tag/add", component: "goods/tag/add", policy: "goodstag/add" },
                    { path: "/goods/tag/edit", component: "goods/tag/edit", policy: "goodstag/edit" },
                    { path: "/goods/brand", redirect: "/goods/brand/list" },
                    { path: "/goods/brand/list", component: "goods/brand/list", policy: "goods/brand" },
                    { path: "/goods/body", component: "goods/body", policy: "goods/bodySet" }
                ],
                policy: "goods/list || goods/category || goods/brand"
            },
            {
                path: "/user", name: "客户", component: "user/layout",
                routes: [
                    { path: "/user", redirect: "/user/list", policy: "user/list" },
                    { path: "/user/list", component: "user/list", policy: "user/list" },
                    { path: "/user/list/detail", component: "user/detail", policy: "user/detail" }
                ],
                policy: "user/list"
            },
            {
                path: "/member",
                routes: [
                    { path: "/member", redirect: "/member/self" },
                    { path: "/member/self", component: "member/self", policy: "member/self" }
                ],
                policy: "member/self"
            },
            {
                path: "/auth", name: "权限", component: "auth/layout",
                routes: [
                    { path: "/auth", redirect: "/auth/group", policy: "auth/member" },
                    { path: "/auth/member", component: "auth/member", policy: "auth/member" },
                    { path: "/auth/group", component: "auth/group", policy: "auth/groupList" },
                    { path: "/auth/policy", component: "auth/policy", policy: "auth/policyList" }
                ],
                policy: "auth/member || auth/group || auth/policy"
            },
            {
                path: "/setting",
                name: "设置",
                policy: "shipper/list || express/list || freight/list || wechat/settingEdit || alipay/settingEdit",
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
                        policy: "shipper/list || express/list || freight/list",
                        routes: [
                            {
                                path: "/setting/deliver",
                                redirect: "/setting/deliver/shipper",
                                policy: "shipper/list"
                            },
                            {
                                path: "/setting/deliver/shipper",
                                component: "setting/shipper/list",
                                policy: "shipper/list"
                            },
                            {
                                path: "/setting/deliver/shipper/add",
                                component: "setting/shipper/add",
                                policy: "shipper/add"
                            },
                            {
                                path: "/setting/deliver/shipper/edit",
                                component: "setting/shipper/edit",
                                policy: "shipper/edit"
                            },
                            {
                                path: "/setting/deliver/express",
                                component: "setting/express/list",
                                policy: "express/list"
                            },
                            {
                                path: "/setting/deliver/express/add",
                                component: "setting/express/add",
                                policy: "express/add"
                            },
                            {
                                path: "/setting/deliver/express/edit",
                                component: "setting/express/edit",
                                policy: "express/edit"
                            },
                            {
                                path: "/setting/deliver/freight",
                                component: "setting/freight/list",
                                policy: "freight/list"
                            },
                            {
                                path: "/setting/deliver/freight/add",
                                component: "setting/freight/add",
                                policy: "freight/add"
                            },
                            {
                                path: "/setting/deliver/freight/edit",
                                component: "setting/freight/edit",
                                policy: "freight/edit"
                            }
                        ]
                    },
                    {
                        path: "/setting/order",
                        name: "订单配置",
                        component: "setting/order",
                        policy: "order/settingEdit"
                    },
                    {
                        path: "/setting/wechat",
                        name: "微信配置",
                        component: "setting/wechat/layout",
                        routes: [
                            {
                                path: "/setting/wechat",
                                redirect: "/setting/wechat/base",
                                policy: "wechat/settingEdit"
                            },
                            {
                                path: "/setting/wechat/base",
                                component: "setting/wechat/base",
                                policy: "wechat/settingEdit"
                            },
                        ],
                        policy: "wechat/settingInfo"
                    },
                    {
                        path: "/setting/alipay",
                        name: "支付宝配置",
                        component: "setting/alipay",
                        policy: "alipay/settingEdit"
                    },
                    {
                        path: "/setting/cloud", name: "云存储", component: "setting/cloud/layout",
                        routes: [
                            { path: "/setting/cloud", redirect: "/setting/cloud/oss" },
                            { path: "/setting/cloud/oss", component: "setting/cloud/oss" }
                        ]
                    },
                ]
            },
        ]
    }
];
