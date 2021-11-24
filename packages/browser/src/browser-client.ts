import { hackConsole } from '@monitor/core';
// import { Behavior } from '@monitor/types';
import { BrowserConfig, setConfig } from './config';
import {
  handleError, handlePerformance, handleRequest, handleResource,
  handleBehavior, handleClick, handleBlur, handleTrack, handlePage,
  hackState, handleHashChange, handleHistoryStateChange,
} from './plugins';
import { BrowserOptions } from './types';

export class BrowserClient {
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
    const {
      token,
      enableError,
      enableXHR,
      enableRecord,
      enableResource,
      enablePerformance,
      enableBehavior,
      enableSPA,
    } = BrowserConfig;

    if (!token) {
      console.warn('请输入应用 token');
      return;
    }

    // 处理页面相关
    const { hash, pathname } = window.location;
    // TODO: SPA Application
    const page = enableSPA ? hash.toLowerCase() : pathname.toLowerCase();
    handlePage(page, true);

    enableSPA && this.addListenRouterChange();
    enableBehavior && this.addListenBehavior();
    enableError && this.addListenJS();
    enableXHR && this.addListenNetworkRequest();
    enableRecord && this.addListenRecordWeb();
    enablePerformance && this.addListenPerformance();
    enableResource && this.addListenResource();

    // 绑定全局变量
    window.MONITOR = this;
    window.MONITOR.track = handleTrack;

    this.addListenUnload();
  }

  /**
   * 监听 路由变化
   *
   * @memberof BrowserClient
   */
  private addListenRouterChange(): void {
    hackState('pushState');
    hackState('replaceState');

    window.addEventListener('hashchange', handleHashChange, true);
    window.addEventListener('historystatechange', handleHistoryStateChange, true);
  }

  /**
   * 移除 路由变化监听
   *
   * @memberof BrowserClient
   */
  private removeListenRouterChange(): void {
    window.removeEventListener('hashchange', handleHashChange, true);
    window.removeEventListener('historystatechange', handleHistoryStateChange, true);
  }

  /**
   * 监听 JS 错误或资源加载错误 & Promise 错误
   *
   * @memberof BrowserClient
   */
  private addListenJS(): void {
    window.addEventListener('error', handleError, true);
    window.addEventListener('unhandledrejection', handleError, true);
  }

  /**
   * 移除 JS 错误或资源加载错误 & Promise 错误的监听
   *
   * @memberof BrowserClient
   */
  private removeListenJS(): void {
    window.removeEventListener('error', handleError);
    window.removeEventListener('unhandledrejection', handleError);
  }

  /**
   * 监听 页面性能
   *
   * @memberof BrowserClient
   */
  private addListenPerformance(): void {
    handlePerformance();
  }

  /**
   * 监听 行为动作
   *
   * @memberof BrowserClient
   */
  private addListenBehavior(): void {
    hackConsole(BrowserConfig.behavior!.console, handleBehavior);
    BrowserConfig.behavior!.click && this.addListenClick();
  }

  /**
   * 监听 界面点击
   *
   * @memberof BrowserClient
   */
  private addListenClick(): void {
    window.addEventListener('click', handleClick, true);
    window.addEventListener('blur', handleBlur, true);
  }

  /**
   * 移除 界面点击监听
   *
   * @memberof BrowserClient
   */
  private removeListenClick(): void {
    window.removeEventListener('click', handleClick);
    window.removeEventListener('blur', handleBlur);
  }

  /**
   * 监听 资源
   *
   * @memberof BrowserClient
   */
  private addListenResource(): void {
    if (window.document.readyState === 'complete') {
      handleResource();
    } else {
      window.addEventListener('load', handleResource);
    }
  }

  /**
   * 监听 网络请求和响应
   *
   * @memberof BrowserClient
   */
  private addListenNetworkRequest(): void {
    // 处理网络请求
    handleRequest();
  }

  /**
   * 监听 录屏
   *
   * @memberof BrowserClient
   */
  private addListenRecordWeb(): void {
    // TODO: 录屏'
  }

  /**
   * 统一处理监听的移除
   *
   * @memberof BrowserClient
   */
  addListenUnload(): void {
    this.destroy();
  }

  /**
   * 销毁 监听
   *
   * @memberof Monitor
   */
  private destroy(): void {
    BrowserConfig.enableError && this.removeListenJS();
    BrowserConfig.behavior!.click && this.removeListenClick();
    BrowserConfig.enableSPA && this.removeListenRouterChange();
  }
}
