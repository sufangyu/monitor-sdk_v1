// import { baseOptions } from '@monitor/core';
import { BrowserConfig, setConfig } from './config';
import { handleError } from './plugins';
import { BrowserOptions } from './types';

export class BrowserClient {
  // // 配置项
  // options: BrowserOptions;

  constructor(options: BrowserOptions) {
    setConfig(options);
    this.run();
  }

  /**
   * 执行函数
   *
   * @memberof BrowserClient
   */
  run(): void {
    const { token, silentError } = BrowserConfig;
    if (!token) {
      console.warn('请输入应用 token');
    } else {
      !silentError && this.addListenJS();
    }
  }

  addListenJS() {
    // JS 错误或资源加载错误
    window.addEventListener('error', handleError, true);
    // Promise 错误
    window.addEventListener('unhandledrejection', handleError, true);
  }
}
