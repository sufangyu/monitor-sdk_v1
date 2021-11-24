import { BaseOptions } from '@monitor/types';

export interface BrowserOptions extends BrowserBaseOptions, BaseOptions { };

export interface BrowserBaseOptions {
  /** 是否自动上报 PV */
  autoSendPV: boolean;
  /** 是否开启单页面 */
  enableSPA: boolean;
  /** 是否错误监控 (包含 unhandledrejection). 为 false 时, 不再监控 */
  enableError?: boolean;
  /** 是否请求(xhr、fetch)监控. 为 false 时, 不再监控 */
  enableXHR?: boolean;
  /** 是否录屏用户操作. 为 false 时, 不再监控 */
  enableRecord?: boolean;
  /** 是否监控页面性能. 为 false 时, 不再监控 */
  enablePerformance?: boolean;
  /** 是否监控页面资源. 为 false 时, 不再监控 */
  enableResource?: boolean;
}
