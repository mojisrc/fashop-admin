import React from 'react';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import Policy from '@jiumao/policy';

export type TAuthority = string[] | string;

/**
 * 权限检查方法
 * @param { 权限判定 | Permission judgment } authority
 * @param { 通过的组件 | Passing components } target
 * @param { 未通过的组件 | no pass components } Exception
 * @param { 权限验证方法 | no pass components } policy
 */
const checkPermissions = (
  authority?: TAuthority,
  target?: React.ReactNode,
  Exception?: React.ReactNode,
  policy?: Policy
) => {

  if (!policy) {
    return target;
  }

  // 没有判定权限.默认查看所有
  if (isUndefined(authority) || isNull(authority)) {
    return target;
  }

  // 数组处理
  if (isArray(authority)) {
    if (policy.multipleVerify(authority)) {
      return target;
    } else {
      return Exception;
    }
  }

  // string 处理
  if (isString(authority)) {
    if (policy.combinationVerify(authority)) {
      return target;
    } else {
      return Exception;
    }
  }

  throw new Error('unsupported parameters');
};

const check = (
  authority?: TAuthority,
  target?: React.ReactNode,
  Exception?: React.ReactNode,
  policy?: Policy
) => {
  return checkPermissions(authority, target, Exception, policy);
};

export default check;

