import { report } from '@monitor/core';
import { PerformanceMsg, KIND_MAP } from '@monitor/types';
import { formatToSecond } from '@monitor/utils';
import { getCommonMsg } from '../utils/message';

/**
 * 监控 页面性能
 *
 * https://help.aliyun.com/document_detail/60288.html
 *
 * @export
 * @returns {void}
 */
export function handlePerformance(): void {
  const { performance } = window;
  if (!performance || typeof performance !== 'object') {
    return;
  }

  const stateCheck = setInterval(() => {
    clearInterval(stateCheck);

    // performance.getEntriesByType('navigation')[0];
    const {
      connectEnd,
      connectStart,
      domContentLoadedEventEnd,
      domInteractive,
      domainLookupEnd,
      domainLookupStart,
      fetchStart,
      loadEventStart,
      requestStart,
      responseEnd,
      responseStart,
      secureConnectionStart,
    } = performance.timing;

    const commonMsg = getCommonMsg();
    const msg: PerformanceMsg = {
      ...commonMsg,
      kind: KIND_MAP.PERFORMANCE,

      // Web端关键性能指标
      timeToInteract: formatToSecond(domInteractive - fetchStart), // 首次可交互时间
      loadTime: formatToSecond(loadEventStart - fetchStart), // 完整的加载时间
      domReadyTime: formatToSecond(domContentLoadedEventEnd - fetchStart), // DOM Ready时间
      firstPaintTime: formatToSecond(responseEnd - fetchStart), // 首次渲染耗时

      // 区间段耗时
      dnsTime: formatToSecond(domainLookupEnd - domainLookupStart), // DNS解析耗时
      tcpTime: formatToSecond(connectEnd - connectStart), // TPC 连接耗时
      ttfbTime: formatToSecond(responseStart - requestStart), // 首字节到达时间
      responseTime: formatToSecond(responseEnd - responseStart), // 内容响应耗时
      domTime: formatToSecond(domInteractive - responseEnd), // DOM 解析耗时
      sslTime: formatToSecond(connectEnd - secureConnectionStart), // SSL 安全连接耗时
      resourceTime: formatToSecond(loadEventStart - domContentLoadedEventEnd), // 资源加载耗时
    };

    report(msg);
  }, 50);
}
