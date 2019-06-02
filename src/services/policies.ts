import { Get, Post, Delete } from '@/utils/request';

// 获取权限策略列表
export async function fetchList(params) {
  return Get('policies/list', params);
}

// 删除权限策略
export async function fetchRemove(id) {
  return Delete(`policies/remove/${id}`);
}

// 创建权限策略
export async function fetchCreate(data) {
  return Post('policies/create', data);
}
