/**
 * 自定义事件
 *
 * @export
 * @param {string} type 事件类型
 * @param {(string | object)} data
 */
export function dispatchCustomEvent(type: string, data: string | object) {
  let customEvent;
  if (window.CustomEvent) {
    customEvent = new CustomEvent(type, {
      detail: data,
    });
  } else {
    customEvent = window.document.createEvent('HTMLEvents');
    customEvent.initEvent(type, false, true);
    (customEvent as any).detail = data;
  }

  window.dispatchEvent(customEvent);
}
