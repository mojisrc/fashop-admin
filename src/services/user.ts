import { Get, Post, Delete, Put } from '@/utils/request';

// 用户登录
export async function fetchLogin(data) {
  return Post('users/login', data);
}

// 退出登录
export async function fetchLogout() {
  return Get('users/logout');
}

// 获取用户列表
export async function fetchList(params) {
  return Get('users/list', params);
}

// 创建用户
export async function fetchCreate(data) {
  return Post('users/create', data);
}

// 删除用户
export async function fetchRemove(data) {
  return Delete(`users/remove/${data}`);
}

// 修改用户
export async function fetchUpdate(data) {
  return Put(`users/update`, data);
}

// 获取当前登录用户信息
export async function fetchCurrent() {
  return Get('users/current');
}

// 重置登录密码 - 无需登录
export async function fetchResetPassword(data) {
  return Post('users/reset-password', data);
}


