import { BaseOptions } from '@monitor/types';

export interface BrowserOptions extends BrowserSilentOptionsType, BaseOptions { };

export interface BrowserSilentOptionsType {
  /** 默认会监控error，为true时，将不在监控 */
  silentError?: boolean;
  /** 默认会监控xhr，为true时，将不再监控 */
  silentXhr?: boolean;
  /** 默认会监控fetch，为true时，将不再监控 */
  silentFetch?: boolean;
  /** 默认会监控console，为true时，将不再监控 */
  silentConsole?: boolean;
  /** 默认会监听click事件，当用户点击的标签不是body时就会被放入breadcrumb，为true，将不在监听 */
  silentDom?: boolean;
  /** 默认会监控popstate、pushState、replaceState，为true时，将不再监控 */
  silentHistory?: boolean;
  /** 默认会监控hashchange，为true时，将不在监控 */
  silentHashchange?: boolean;
  /** 默认会监控unhandledrejection，为true时，将不在监控 */
  silentUnhandledrejection?: boolean;
}
