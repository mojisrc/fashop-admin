import globalHeader from './zh-CN/globalHeader';
import exception from './zh-CN/exception';
import menu from './zh-CN/menu';
import login from './zh-CN/login';
import passwordReset from './zh-CN/password-reset';
import validation from './zh-CN/validation';
import settings from './zh-CN/settings';

export default {
  'navBar.lang': '语言',
  ...menu,
  ...login,
  ...passwordReset,
  ...validation,
  ...settings,
  ...exception,
  ...globalHeader
};
