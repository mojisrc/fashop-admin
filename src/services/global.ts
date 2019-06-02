import { Get } from '@/utils/request';

// 获取消息通知
export async function fetchNotices(params) {
  return Get('notices', params);
}

// 获取验证码
export async function fetchCaptcha(params) {
  return Get('captcha', params);
}
