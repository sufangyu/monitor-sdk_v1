/* eslint-disable import/no-mutable-exports */
import { baseOptions } from '@monitor/core';
import { BrowserOptions } from './types';

/** 浏览器端的基础配置 */
export let BrowserConfig: Partial<BrowserOptions> = {
  silentXhr: false,
  silentFetch: false,
  silentConsole: false,
  silentDom: false,
  silentHistory: false,
  silentHashchange: false,
  silentError: false,
  silentUnhandledrejection: false,
};

export function setConfig(options: BrowserOptions) {
  BrowserConfig = {
    ...baseOptions, ...BrowserConfig, ...options,
  };
}
