import { Get, Post, Put, Delete } from '@/utils/request';

// 获取客户列表
export async function fetchList(params) {
  return Get('user/list', params);
}
