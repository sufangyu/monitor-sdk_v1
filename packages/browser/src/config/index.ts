/* eslint-disable import/no-mutable-exports */
import { baseOptions } from '@monitor/core';
import { BrowserOptions } from '../types';

/** 浏览器端的基础配置 */
export let BrowserConfig: Partial<BrowserOptions> = {
  autoSendPV: true,
  enableSPA: true,
  enableXHR: true,
  enableError: true,
  enableRecord: true,
  enablePerformance: true,
  enableResource: true,
};

export function setConfig(options: BrowserOptions) {
  BrowserConfig = {
    ...baseOptions,
    ...BrowserConfig,
    ...options,
  };
}
