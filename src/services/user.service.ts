import { Get, Post } from '@/utils/request';

// 获取当前登录用户信息
export async function fetchCurrent() {
  return Get('/user/current');
}

// 用户登录
export async function fetchLogin(data) {
  return Post('/user/login', data);
}
