import { Get, Post, Put, Delete } from '@/utils/request';

// 获取操作列表
export async function fetchList(params) {
  return Get('actions/list', params);
}

// 创建操作
export async function fetchCreate(data) {
  return Post('actions/create', data);
}

// 删除操作
export async function fetchRemove(data) {
  return Delete('actions/remove', data);
}

// 更新操作
export async function fetchUpdate(data) {
  return Put('actions/update', data);
}

// 获取操作模块
export async function fetchModuleList() {
  return Get('actions/modules')
}
