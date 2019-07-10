export default [
  // user
  {
    path: '/user',
    name: 'user',
    component: '../layouts/user-layout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      {
        path: '/user/login',
        name: 'login',
        component: './user/login',
      },
      {
        path: '/user/password-reset',
        name: 'password-reset',
        component: './user/password-reset',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/basic-layout',
    Routes: ['src/pages/authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        component: './dashboard/dashboard',
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './exception/500',
          },
        ],
      },
      {
        name: 'shop',
        icon: 'icon-shop',
        path: '/shop',
        routes: [
          {
            path: '/shop/list',
            name: 'list',
            component: './shop/list',
          },
          {
            path: '/shop/images',
            name: 'images',
            component: './shop/images',
          },
        ],
      },
      {
        name: 'client',
        icon: 'icon-client',
        path: '/client',
        routes: [
          {
            path: '/client/list',
            name: 'list',
            component: './client/list',
          },
        ],
      },
      {
        name: 'goods',
        icon: 'shopping',
        path: '/goods',
        routes: [
          {
            path: '/goods/list',
            name: 'list',
            component: './goods/list',
          },
          {
            path: '/goods/category',
            name: 'category',
            component: './goods/category',
          },
          {
            path: '/goods/brands',
            name: 'brands',
            component: './goods/brands',
          },
        ],
      },
      {
        name: 'order',
        icon: 'icon-order',
        path: '/order',
        routes: [
          {
            path: '/order/list',
            name: 'list',
            component: './order/list',
          },
          {
            path: '/order/refund',
            name: 'refund',
            component: './order/refund',
          },
          {
            path: '/order/evaluate',
            name: 'evaluate',
            component: './order/evaluate',
          },
        ],
      },
      {
        name: 'marketing',
        icon: 'icon-marketing',
        path: '/marketing',
        routes: [
          {
            path: '/marketing/coupon',
            name: 'coupon',
            component: './marketing/coupon',
          },
          {
            path: '/marketing/spike',
            name: 'spike',
            component: './marketing/spike',
          },
          {
            path: '/marketing/gift',
            name: 'gift',
            component: '../layouts/blank-layout',
            routes: [
              {
                path: '/marketing/gift/list',
                name: 'list',
                component: './marketing/gift/list',
              },
              {
                path: '/marketing/gift/record',
                name: 'record',
                component: './marketing/gift/record',
              },
            ],
          },
          {
            path: '/marketing/member-card',
            name: 'member-card',
            component: '../layouts/blank-layout',
            routes: [
              {
                path: '/marketing/member-card/list',
                name: 'list',
                component: './marketing/member-card/list',
              },
              {
                path: '/marketing/member-card/order',
                name: 'order',
                component: './marketing/member-card/order',
              },
            ],
          },
          {
            path: '/marketing/points',
            name: 'points',
            component: '../layouts/blank-layout',
            routes: [
              {
                path: '/marketing/points/goods',
                name: 'goods',
                component: './marketing/points/goods',
              },
              {
                path: '/marketing/points/log',
                name: 'log',
                component: './marketing/points/log',
              },
              {
                path: '/marketing/points/setting',
                name: 'setting',
                component: './marketing/points/setting',
              },
            ],
          },
          {
            path: '/marketing/reward',
            name: 'reward',
            component: './marketing/reward/list',
          },
        ],
      },
      {
        name: 'permission',
        icon: 'lock',
        path: '/permission',
        routes: [
          {
            path: '/permission/actions',
            name: 'actions',
            component: './permission/actions/actions',
          },
          {
            path: '/permission/policies',
            name: 'policies',
            component: './permission/policies/policies',
          },
          {
            path: '/permission/policies/create',
            name: 'policy-create',
            hideInMenu: true,
            component: './permission/policies/create',
          },
        ],
      },
      {
        name: 'system',
        icon: 'desktop',
        path: '/system',
        routes: [
          {
            path: '/system/user',
            name: 'user',
            authority: '*',
            component: './system/users',
          },
          {
            path: '/system/group',
            name: 'group',
            authority: '*',
            component: './system/groups',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './account/center',
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './account/settings',
          },
        ],
      },
    ],
  },
];
