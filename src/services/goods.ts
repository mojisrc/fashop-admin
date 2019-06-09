import { Get } from '@/utils/request';

// 获取客户列表
export async function fetchList(params) {
  return Get('goods/list', params);
}
