import {
  GLOBAL_VAL, setGlobalPage, setGlobalSessionID, resetGlobalHealth,
  report,
} from '@monitor/core';
import { PageViewMsg, HealthMsg, KIND_MAP } from '@monitor/types';
import { BrowserConfig } from '../config';
import { getCommonMsg } from '../utils/message';
import { handleNavigation } from './behavior';

/**
 * 处理 PV(页面流量次数)
 *
 * @export
 */
export function handlePageView(): void {
  if (!BrowserConfig.autoSendPV) {
    return;
  }

  const commonMsg = getCommonMsg();
  const msg: PageViewMsg = {
    ...commonMsg,
    kind: KIND_MAP.PV,
    title: document.title,
    href: window.location.href,
    referrer: document.referrer,
    dpr: window.devicePixelRatio,
    charset: document.charset,
  };

  report(msg);
}

/**
 * 处理页面健康状态
 *
 * @export
 */
export function handleHealth(): void {
  // 健康状态. NO、YES;
  const healthy = GLOBAL_VAL._health.errorCount ? 'NO' : 'YES';
  const commonMsg = getCommonMsg();
  const msg: HealthMsg = {
    ...commonMsg,
    kind: KIND_MAP.HEALTH,
    healthy,
    ...GLOBAL_VAL._health,
    stay: Date.now() - GLOBAL_VAL.sessionBegin, // 停留时间
  };

  resetGlobalHealth();
  report(msg);
}

/**
 * 处理 页面相关
 *
 * @export
 * @param {string} page
 * @param {boolean} [isFirst] 页面是否是第一次加载
 */
export function handlePage(page: string, isFirst = true): void {
  // eslint-disable-next-line no-debugger
  debugger;
  !isFirst && handleHealth();

  handleNavigation(page);
  // TODO: iframe

  setGlobalPage(page);
  setGlobalSessionID();
  handlePageView();
}
