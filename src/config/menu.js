import { isUrl } from '.@/utils/index';

const menuData = [
    {
        path: 'home',
        name: '首页',
        children: [
            {
                path: 'analysis',
                name: '概况',
            }
        ]
    }, {
        path: 'userInfo',
        name: '个人资料',
        hideInMenu: true,
    }, {
        path: 'shop',
        name: '店铺',
        children: [
            {
                path: 'decorate',
                name: '店铺装修'
            }, {
                path: 'setting',
                name: '店铺设置',
            }, {
                path: 'pageEdit',
                name: '编辑模板',
                hideInMenu: true,
            }, {
                path: 'pageAdd',
                name: '新增模板',
                hideInMenu: true,
            }
        ]
    }, {
        path: 'order',
        name: '订单',
        children: [
            {
                path: 'list',
                name: '订单管理',
            }, {
                path: 'evaluate',
                name: '评价管理',
            }, {
                path: 'refund',
                name: '退款售后',
            }
        ]
    }, {
        path: 'goods',
        name: '商品',
        children: [
            {
                path: 'list',
                name: '商品管理',
            }, {
                path: 'category',
                name: '分类管理',
            }
        ]
    }, {
        path: 'user',
        name: '客户',
        children: [
            {
                path: 'list',
                name: '客户管理',
            }
        ]
    },
    {
            path: 'marketing',
            name: '营销',
            children: [
                {
                    path: 'group',
                    name: '拼团',
                },
                {
                    path: 'group/scondKill',
                    name: '秒杀',
                },
                {
                    path: 'group/xianshigou',
                    name: '限时购',
                },
                {
                    path: 'group/manjian',
                    name: '满减',
                },
                {
                    path: 'group/zengpin',
                    name: '赠品',
                }
            ]
    },
    // , {
    //     path: 'article',
    //     name: '图文',
    //     children: [
    //         {
    //             path: 'list',
    //             name: '图文管理',
    //         }
    //     ]
    // },
    // {
    //     path: 'wechat',
    //     name: '微信',
    //     children: [
    //         {
    //             path: 'publicAccounts',
    //             name: '公众号',
    //         }, {
    //             path: 'bindPublicAccounts',
    //             name: '绑定公众号',
    //             hideInMenu: true,
    //         }, {
    //             path: 'weapp',
    //             name: '小程序',
    //         }
    //     ]
    // },
    {
        path: 'setting',
        name: '设置',
        children: [
            {
                path: 'deliver',
                name: '配送设置',
            },{
                path: 'orderSetting',
                name: '订单设置',
            }, {
                path: 'paymentSetting',
                name: '支付设置',
            }
            // , {
            //     path: 'smsSetting',
            //     name: '短信提醒',
            // }
        ]
    },
    // {
    //       path: 'config',
    //       name: '配置',
    //       children: [
    //           {
    //               path: 'manage',
    //               name: '管理配置',
    //           },{
    //               path: 'add',
    //               name: '添加配置',
    //               hideInMenu: true,
    //           },{
    //               path: 'info',
    //               name: '配置',
    //           },{
    //               path: 'group',
    //               name: '配置分组',
    //               hideInMenu: false,
    //           }
    //       ]
    //   },
    // {
    //         path: 'apply',
    //         name: '应用',
    //         children: [
    //             {
    //                 path:'claim',
    //                 name: '应用',
    //             },{
    //                 path:'site',
    //                 name: '站点管理',
    //             },{
    //                 path: 'management',
    //                 name:"应用管理"
    //             },{
    //                 path: 'managementModify',
    //                 name:"历史修改记录",
    //                 hideInMenu: true
    //             },{
    //                 path: 'managementAdd',
    //                 name:"添加应用",
    //                 hideInMenu: true
    //             }
    //         ]
    // },
    {
        path: 'exception',
        name: '异常',
        hideInMenu: true,
        children: [
            {
                path: '403',
                name: '403'
            }, {
                path: '500',
                name: '500',
            }
        ]
    }
];

function formatter(data, parentPath = '/', parentAuthority) {
    return data.map(item => {
        let { path } = item;
        if (!isUrl(path)) {
            path = parentPath + item.path;
        }
        const result = {
            ...item,
            path,
            authority: item.authority || parentAuthority,
        };
        if (item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
        }
        return result;
    });
}

export const getMenuData = () => formatter(menuData);
