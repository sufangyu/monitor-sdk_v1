import { CommonMsg } from '@monitor/types';
import { getUID, getScreen, getLang } from '@monitor/utils';
import { BrowserConfig } from '../config';

/**
 * 获取公共信息
 *
 * @export
 */
export function getCommonMsg(): CommonMsg {
  const u = (navigator as any).connection;
  return {
    kind: '',
    page: '', // TODO:
    times: 1,
    version: '0.0.1', // TODO:
    token: BrowserConfig.token!,
    env: BrowserConfig.environment!,
    begin: new Date().getTime(),
    uid: getUID(),
    sid: '', // TODO:
    screenSize: `${window.screen.width}x${window.screen.height}`,
    viewSize: getScreen(),
    network: u ? u.effectiveType : '',
    language: getLang(),
    _sdkVersion: BrowserConfig.version!,
    origin: window.location.href,
  };
}
