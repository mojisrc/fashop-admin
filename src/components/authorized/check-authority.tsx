import React from 'react';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import Policy from '@jiumao/policy';

export type TAuthority = string[] | string;

/**
 * 权限检查方法
 * @param { 权限判定 | Permission judgment } authority
 * @param { 权限验证方法 | no pass components } policy
 */
const checkAuthority = (
  policy?: Policy,
  authority?: TAuthority
): boolean => {
  let result = true;

  // 数组处理
  if (isArray(authority)) {
    if (!policy.multipleVerify(authority)) {
      result = false;
    }
  }

  // string 处理
  if (isString(authority)) {
    if (!policy.combinationVerify(authority)) {
      result = false;
    }
  }

  return result;
};

export default checkAuthority;
