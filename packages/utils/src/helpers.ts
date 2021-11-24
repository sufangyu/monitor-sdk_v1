/**
 * 随机 UUID
 *
 * @returns
 */
export function generateUID() {
  // eslint-disable-next-line no-bitwise
  let firstPart: number | string = (Math.random() * 46656) | 0;
  // eslint-disable-next-line no-bitwise
  let secondPart: number | string = (Math.random() * 46656) | 0;
  firstPart = (`000${firstPart.toString(36)}`).slice(-10);
  secondPart = (`000${secondPart.toString(36)}`).slice(-10);
  return firstPart + secondPart;
}

/**
 * 获取 UUID
 *
 * @export
 * @returns
 */
export function getUID() {
  const UID_KEY = 'MONITOR_UID';

  let uid = localStorage.getItem(UID_KEY) || '';
  if (!uid) {
    uid = generateUID();
    localStorage.setItem(UID_KEY, uid);
  }
  return uid;
}

/**
 * 获取浏览器默认语言
 *
 * @export
 * @returns {string}
 */
export function getLang(): string {
  // 常规浏览器语言和 IE 浏览器
  let lang = navigator.language || (navigator as any).userLanguage;
  // 截取 lang 前2位字符
  lang = lang.substr(0, 2);
  return lang;
}

/**
 * 获取浏览器宽高
 *
 * @export
 * @returns {string}
 */
export function getScreen(): string {
  const w = document.documentElement.clientWidth || document.body.clientWidth;
  const h = document.documentElement.clientHeight || document.body.clientHeight;
  return `${w}x${h}`;
}
