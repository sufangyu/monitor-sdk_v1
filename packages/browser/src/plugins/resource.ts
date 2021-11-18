import { report } from '@monitor/core';
import { ResourceMsg, KIND_MAP } from '@monitor/types';
import { formatToSecond } from '@monitor/utils';
import { BrowserConfig } from '../config';
import { getCommonMsg } from '../utils/message';

/**
 * 监控 资源信息
 *
 * @export
 * @returns
 */
export function handleResource() {
  const { performance } = window;
  if (!performance || typeof performance !== 'object' || typeof performance.getEntriesByType !== 'function') {
    return;
  }

  // 页面加载的资源集合
  let resources = performance.getEntriesByType('resource') || [];
  let timing: any = performance.timing || {};

  // 过滤忽略的 URL
  resources = resources.filter((item) => {
    // eslint-disable-next-line arrow-body-style
    const isInclude = BrowserConfig.ignore!.ignoreApis.findIndex((ignoreApi) => {
      return item.name.indexOf(ignoreApi) > -1;
    });
    return !(isInclude > -1);
  });

  // 从 getEntriesByType 取精准值
  if (typeof window.PerformanceNavigationTiming === 'function') {
    const navigation = performance.getEntriesByType('navigation')[0];
    navigation && (timing = navigation);
  }

  const {
    domInteractive,
    responseEnd,
    loadEventStart,
    fetchStart,
  } = timing;

  const commonMsg = getCommonMsg();
  const msg: ResourceMsg = {
    ...commonMsg,
    kind: KIND_MAP.RESOURCE,
    dom: formatToSecond(domInteractive - responseEnd), // DOM 解析耗时 domInteractive - responseEnd
    load: formatToSecond(loadEventStart - fetchStart), // 首屏加载时间 loadEventStart- fetchStart
    resources,
  };

  // FIXME: 兼容Edge浏览器无法直接使用PerformanceResourceTiming对象类型的数据进行上报，处理方式是定义变量重新赋值

  report(msg);
}
