import { SDK_NAME } from '@monitor/shared';
import { dispatchCustomEvent, parseHash, parseUrl } from '@monitor/utils';
import { BrowserConfig } from '../config';
import { handlePage } from './navigation';

/**
 * 增强 拦截 onpopstate
 *
 */
function hackOnpopstate() {
  window.__oOnpopstate__ = window.onpopstate;

  window.onpopstate = function (...args) {
    // console.log('hack onpopstate args =>>', args);
    const { hash, pathname } = window.location;
    const page = BrowserConfig.enableSPA ? parseHash(hash.toLowerCase()) : pathname.toLowerCase();
    handlePage(page, false);

    window.__oOnpopstate__ && window.__oOnpopstate__.apply(this, args);
  };
}

/**
 * 增强 浏览器的 pushState、replaceState 事件
 *
 * @export
 * @param {('pushState' | 'replaceState')} type
 */
export function hackState(type: 'pushState' | 'replaceState') {
  const action = window.history[type];
  if (typeof action !== 'function') {
    return;
  }

  window.history[type] = function (...args): void {
    !window.__oOnpopstate__ && hackOnpopstate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_data, _title, path] = args;
    const { href } = window.location;
    const newAction = action.apply(window.history, args);

    if ((!path || typeof path !== 'string') || (href === path)) {
      return newAction;
    }

    try {
      const _currentURL = href.split('#');
      const _toURL = path.split('#');
      const currentURL = parseUrl(_currentURL[0]);
      const toURL = parseUrl(_toURL[0]);
      const currentHash = _currentURL[1] && _currentURL[1].replace(/^\/?(.*)/, '$1');
      const toHash = _toURL[1] && _toURL[1].replace(/^\/?(.*)/, '$1');
      // eslint-disable-next-line no-unused-expressions
      currentURL !== toURL
        ? dispatchCustomEvent('historystatechange', toURL)
        : currentHash !== toHash && dispatchCustomEvent('historystatechange', toHash);
    } catch (error) {
      console.warn(`[${SDK_NAME} hackState] error in ${type}: ${error}`);
    }

    return newAction;
  };
}

/**
 * 处理 Hash change 路由变化
 *
 * @export
 */
export function handleHashChange() {
  const { hash, pathname } = window.location;
  const page = BrowserConfig.enableSPA ? parseHash(hash.toLowerCase()) : pathname.toLowerCase();
  page && handlePage(page, false);
}

/**
 * 处理 History change 路由变化
 *
 * @export
 * @param {CustomEvent} ev
 */
export function handleHistoryStateChange(ev: CustomEvent) {
  const page = BrowserConfig.enableSPA
    ? parseHash(ev.detail.toLowerCase())
    : ev.detail.toLowerCase();
  page && handlePage(page, false);
}
