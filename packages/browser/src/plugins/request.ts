/* eslint-disable no-use-before-define */
import { report, setGlobalHealth } from '@monitor/core';
import { SDK_NAME } from '@monitor/shared';
import {
  KIND_MAP, ApiMsg, RequestBaseInfo, HEALTH_TYPE_MAP,
} from '@monitor/types';
import { BrowserConfig } from '../config';
import { getCommonMsg } from '../utils/message';

/**
 * 监控 网络请求
 *
 * @export
 */
export function handleRequest(): void {
  hackAjax();
  hackFetch();

  // TODO: Axios request hack
}

/**
 * 处理网络请求
 *
 * @export
 * @param {string} url API 路径
 * @param {boolean} success 请求成功?
 * @param {number} delay 请求响应时间
 * @param {number} status 请求响应状态
 * @param {string} msg 请求响应信息
 * @param {number} begin 请求发起时间
 */
export function handleApi(
  url: string,
  success: boolean,
  delay: number,
  status: number,
  msg: string,
  begin: number,
  requestInfo: RequestBaseInfo = {} as RequestBaseInfo,
): void {
  if (!url) {
    console.warn(`[${SDK_NAME}]: Empty request url!`);
    return;
  }

  // 当前页面的API健康状态
  setGlobalHealth(HEALTH_TYPE_MAP.API, success);

  const commonMsg = getCommonMsg();
  const apiMsg: ApiMsg = {
    ...commonMsg,
    kind: KIND_MAP.API,
    begin,
    url,
    success,
    delay,
    status,
    msg,
    requestInfo,
  };

  // 过滤忽略的 API URL
  const include = BrowserConfig.ignore!.ignoreApis.findIndex((item) => item === url);
  if (include === -1) {
    report(apiMsg);
  }
}

/**
 * 增强 Ajax (XMLHttpRequest)
 *
 * @returns
 */
function hackAjax() {
  if (typeof window.XMLHttpRequest !== 'function') {
    return;
  }

  let begin = 0; // 请求开始时间
  let apiURL = ''; // 请求路径地址
  let _data = ''; // POST 请求传参
  const _headers: {[key: string]: any} = {}; // 请求头
  let _method = '';
  const __oXMLHttpRequest__ = window.XMLHttpRequest;
  window.__oXMLHttpRequest__ = __oXMLHttpRequest__;

  window.XMLHttpRequest = function (t: any): any {
    const xhr = new __oXMLHttpRequest__(t);
    const { open, send, setRequestHeader } = xhr;

    xhr.open = function (method: string, url?: string) {
      const args = arguments.length === 1 ? [method] : Array.apply(null, [method, url]);
      // FIX: 非 http/https 开头的请求路径补全
      apiURL = url || '';
      _method = method.toUpperCase();
      open.apply(xhr, args);
    };

    xhr.setRequestHeader = function (header: string, value: string) {
      _headers[header] = value;
      setRequestHeader.apply(xhr, [header, value]);
    };

    xhr.send = function () {
      begin = Date.now();
      // eslint-disable-next-line prefer-rest-params, prefer-spread
      const args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, (arguments as any));

      // 处理接口响应情况
      this.addEventListener('readystatechange', () => {
        this._overrideOnreadystatechange();
      });

      _data = args.join('');
      send.apply(xhr, args);
    };

    // 监听响应, 上报响应信息
    xhr._overrideOnreadystatechange = function () {
      if (xhr.readyState === 4) {
        const delay = Date.now() - begin;
        const requestInfo: RequestBaseInfo = {
          method: _method,
          headers: _headers,
          data: _data,
        };

        if (xhr.status >= 200 && xhr.status <= 299) {
          const status = xhr.status || 200;
          if (typeof xhr.getResponseHeader === 'function') {
            const contentType = xhr.getResponseHeader('Content-Type');
            if (contentType && !/(text)|(json)/.test(contentType)) {
              return;
            }

            handleApi(apiURL, true, delay, status, xhr.responseText || '', begin, requestInfo);
          }
        } else {
          handleApi(apiURL, false, delay, xhr.status, xhr.responseText || '', begin, requestInfo);
        }
      }
    };

    return xhr;
  };
}

/**
 * 增强 Fetch
 *
 */
function hackFetch() {
  if (typeof window.fetch !== 'function') {
    return;
  }

  const __oFetch__ = window.fetch;
  window.__oFetch__ = __oFetch__;

  window.fetch = function (input: RequestInfo, init?: RequestInit): Promise<Response> {
    const args = arguments.length === 1 ? [input] : Array.apply(null, [input, init]);
    const url = (input && typeof input !== 'string' ? input.url : input) || '';
    const begin = Date.now();
    const requestInfo: RequestBaseInfo = {
      method: init?.method!.toUpperCase(),
      headers: init?.headers,
      data: init?.body ?? '',
    };

    if (!url) {
      console.warn(`[${SDK_NAME}]: Empty request url!`);
      return __oFetch__.apply(window, (args as any));
    }

    return __oFetch__.apply(window, (args as any)).then((ev: any) => {
      const response = ev.clone();
      const { headers } = response;

      if (headers && typeof headers.get === 'function') {
        const contentType = headers.get('content-type');
        if (contentType && !/(text)|(json)/.test(contentType)) {
          return ev;
        }
      }

      // 响应时间
      const delay = Date.now() - begin;
      response.text().then((res: any) => {
        handleApi(url, response.ok, delay, response.status, res || '', begin, requestInfo);
        return res;
      });

      return ev;
    }).catch((err: any) => {
      // console.log('catch err: ', err);
      // 错误状态
      const ERROR_STATUS = -1;
      const delay = Date.now() - begin;
      handleApi(url, false, delay, ERROR_STATUS, err || '', begin, requestInfo);
      return err;
    });
  };
}
