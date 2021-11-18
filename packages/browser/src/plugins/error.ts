/* eslint-disable no-use-before-define, no-unused-expressions */
import { report } from '@monitor/core';
import { KIND_MAP, ERROR_TYPE_MAP, ErrorMsg } from '@monitor/types';
import { getCommonMsg } from '../utils/message';

/**
 * 监控 语法、资源、异步错误
 *
 * @export
 * @param {*} error
 */
export function handleError(error: { type: string; }): void {
  switch (error.type) {
    case 'error':
      error instanceof ErrorEvent ? handleCaughtError(error) : handleResourceError(error);
      break;
    case 'unhandledrejection':
      handlePromiseError(error);
      break;
    // case 'httpError':
      // handleHttpError(error);
      // break;
    default:
  }
}

/**
 * 语法错误
 *
 * @param {*} error
 */
function handleCaughtError(error: any): void {
  // console.log('handleCaughtError', error);
  const type = error?.name ?? 'CustomError';
  const message = error.message ?? '';
  const stack = error.error.stack ?? '';
  const commonMsg = getCommonMsg();

  const msg: ErrorMsg = {
    ...commonMsg,
    kind: KIND_MAP.ERROR,
    errorType: ERROR_TYPE_MAP.CAUGHT_ERROR,
    cate: type, // 类别
    msg: message?.substring(0, 1e3), // 信息
    detail: stack?.substring(0, 1e3), // 错误栈
    file: error.filename || '', // 出错文件
    line: error.lineno || '', // 行
    col: error.colno || '', // 列
  };

  report(msg);
}

/**
 * 资源错误
 *
 * @param {*} error
 */
function handleResourceError(error: any): void {
  // console.log('handleResourceError error', error);
  const commonMsg = getCommonMsg();
  const { target } = error;
  const msg: ErrorMsg = {
    ...commonMsg,
    kind: KIND_MAP.ERROR,
    errorType: ERROR_TYPE_MAP.RESOURCE,
    msg: target.outerHTML,
    file: target.src || target.href,
    tagName: target.tagName,
    // stack: target?.localName?.toUpperCase(),
  };

  report(msg);
}

/**
 * 异步错误
 *
 * @param {*} error
 */
function handlePromiseError(error: any): void {
  // console.log('handlePromiseError error', error);
  const commonMsg = getCommonMsg();
  const msg: ErrorMsg = {
    ...commonMsg,
    kind: KIND_MAP.ERROR,
    errorType: ERROR_TYPE_MAP.PROMISE,
    msg: typeof error.reason === 'string' ? error?.reason : error?.reason?.message,
  };

  report(msg);
}
