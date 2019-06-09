import { Get, Post } from '@/utils/request';

// 获取文件夹列表
export async function fetchFolderList(params) {
  return Get('imagefolder/list', params);
}

// 创建文件夹
export async function fetchFolderCreate(params) {
  return Post('imagefolder/add', params);
}

// 删除文件夹
export async function fetchFolderRemove(params) {
  return Post('imagefolder/del', params);
}
