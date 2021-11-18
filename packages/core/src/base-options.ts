import { BaseOptions } from '@monitor/types';
import { SDK_VERSION, REPORT_URL } from '@monitor/shared';

/** 基础配置 */
export const baseOptions: Partial<BaseOptions> = {
  reportUrl: REPORT_URL,
  environment: 'production',
  duration: 300,
  version: SDK_VERSION,
  ignore: {
    ignoreErrors: [],
    ignoreUrls: [],
    ignoreApis: [
      '/api/v1/report/web',
      'livereload.js?snipver=1',
      '/sockjs-node/info',
      // 'https://cnodejs.org/api/v1/user/sufangyu',
    ],
  },
  silentBehavior: false,
  behavior: {
    console: ['warn', 'error'],
    click: true,
  },
  maxLength: 1000,
};
