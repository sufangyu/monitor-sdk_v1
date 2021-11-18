import { BaseOptions } from '@monitor/types';

export interface BrowserOptions extends BrowserSilentOptionsType, BaseOptions { };

export interface BrowserSilentOptionsType {
  /** 默认会监控 error(包含 unhandledrejection), 为 true 时, 将不再监控 */
  silentError?: boolean;
  /** 默认会监控 xhr、fetch, 为 true 时, 将不再监控 */
  silentXhr?: boolean;
  /** 默认会监控 console, 为 true 时, 将不再监控 */
  silentConsole?: boolean;
  /** 默认会监听 click 事件, 当用户点击的标签不是 body 时就会被放入 breadcrumb, 为true, 将不再监控 */
  silentDom?: boolean;
  /** 默认会监控popstate、pushState、replaceState, 为 true 时, 将不再监控 */
  silentHistory?: boolean;
  /** 默认会监控 hashchange, 为 true 时, 将不在监控 */
  silentHashchange?: boolean;
  /** 默认会录屏用户操作, 为 true 时, 将不在监控 */
  silentRecord?: boolean;
  /** 默认会监控页面性能, 为 true 时, 将不在监控 */
  silentPerformance?: boolean;
  /** 默认会监控页面资源, 为 true 时, 将不在监控 */
  silentResource?: boolean;
}
