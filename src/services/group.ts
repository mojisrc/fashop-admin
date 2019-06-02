import { Get, Post, Put, Delete } from '@/utils/request';

// 获取所有用户组
export async function fetchAll(params) {
  return Get('groups/all', params);
}

// 获取用户组列表
export async function fetchList(params) {
  return Get('groups/list', params);
}

// 创建用户组
export async function fetchCreate(data) {
  return Post('groups/create', data);
}

// 删除用户组
export async function fetchRemove(id) {
  return Delete(`groups/remove/${id}`);
}

// 更新用户组
export async function fetchUpdate(data) {
  return Put('groups/update', data);
}
