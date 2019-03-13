export default [
  // user
  {
    path: '/user',
    component: '../layouts/user.layout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './user/login' }
    ]
  }
];
