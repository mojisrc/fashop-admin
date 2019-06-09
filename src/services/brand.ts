import { Get } from '@/utils/request';

// 获取品牌列表
export async function fetchList(params) {
  return Get('brand/list', params);
}
