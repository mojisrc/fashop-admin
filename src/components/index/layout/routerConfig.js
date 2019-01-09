import authSignConfig from '../../../utils/authSignConfig'
const {auth} = authSignConfig


export const routerConfig = {
    routers: [
        {
            path: 'home',
            title: '首页',
            children: [
                {
                    path: 'analysis',
                    title: '概况',
                }
            ]
        },{
            path: 'userInfo',
            title: '个人资料',
            hideInMenu: true,
        },{
            path: 'shop',
            title: '店铺',
            children: [
                {
                    path: 'decorate',
                    title: '店铺装修'
                }, {
                    path: 'setting',
                    title: '店铺设置',
                }, {
                    path: 'pageEdit',
                    title: '编辑模板',
                    hideInMenu: true,
                }, {
                    path: 'pageAdd',
                    title: '新增模板',
                    hideInMenu: true,
                }, {
                    path: 'shopList',
                    name: '分销商管理'
                }, {
                    path: 'storeSetting',
                    name: '总店设置'
                }
            ]
        },{
            path: 'order',
            title: '订单',
            children: [
                {
                    path: 'index',
                    title: '订单管理',
                }, {
                    path: 'detail',
                    title: '订单详情',
                    hideInMenu: true,
                }, {
                    path: 'send',
                    title: '设置发货',
                    hideInMenu: true,
                }, {
                    path: 'evaluate',
                    title: '评价管理',
                }, {
                    path: 'refund',
                    title: '退款售后',
                }, {
                    path: 'refundEdit',
                    title: '退款编辑',
                    hideInMenu: true,
                }
            ]
        },{
            path: 'goods',
            title: '商品',
            children: [
                {
                    path: 'management',
                    title: '商品管理',
                }, {
                    path: 'categoryManagement',
                    title: '分类管理',
                }, {
                    path: 'categoryAdd',
                    title: '添加分类',
                    hideInMenu: true,
                }, {
                    path: 'categoryEdit',
                    title: '编辑分类',
                    hideInMenu: true,
                }, {
                    path: 'add',
                    title: '添加商品',
                }
            ]
        },{
            path: 'customer',
            title: '客户',
            children: [
                {
                    path: 'customerManagement',
                    title: '客户管理',
                },{
                    path: 'customerDetail',
                    title: '客户详情',
                    hideInMenu: true,
                }
            ]
        },
        {
            path: 'wechat',
            title: '微信',
            children: [
                {
                    path: 'publicAccounts',
                    title: '公众号',
                },{
                    path: 'bindPublicAccounts',
                    title: '绑定公众号',
                    hideInMenu: true,
                },{
                    path: 'weapp',
                    title: '小程序',
                }
            ]
        },{
            path: 'setting',
            title: '设置',
            children: [
                {
                    path: 'node',
                    title: '节点设置',
                    hideInMenu: true,
                },{
                    path: 'deliver',
                    title: '配送设置'
                },{
                    path: 'shipperAdd',
                    title: '新增地址',
                    hideInMenu: true,
                },{
                    path: 'freightAdd',
                    title: '新增模板',
                    hideInMenu: true,
                },{
                    path: 'orderSetting',
                    title: '订单设置',
                },{
                    path: 'paymentSetting',
                    title: '支付设置',
                },{
                    path:'smsSetting',
                    title: '短信提醒',
                },{
                    path:'smsEdit',
                    title:'编辑短信',
                    hideInMenu: true,
                }
                // ,{
                //     path:'systemSetting',
                //     title: '系统升级',
                // }
            ]
        },
        {
            path: 'exception',
            title: '异常',
            hideInMenu: true,
            children: [
                {
                    path: '403',
                    title: '403'
                }, {
                    path: '500',
                    title: '500',
                }
            ]
        }
    ]
}
