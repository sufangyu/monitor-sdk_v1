import { report } from '@monitor/core';
import { SDK_NAME } from '@monitor/shared';
import {
  Behavior, BehaviorMsg, EventBehavior, TrackBehavior, KIND_MAP, BEHAVIOR_TYPE_MAP,
} from '@monitor/types';
import { getCommonMsg } from '../utils/message';

/**
 * 监控 行为动作
 *
 * @export
 * @param {Behavior} behavior
 */
export function handleBehavior(behavior: Behavior): void {
  const commonMsg = getCommonMsg();
  const msg: BehaviorMsg = {
    ...commonMsg,
    kind: KIND_MAP.BEHAVIOR,
    behavior,
  };

  report(msg);
}

/**
 * 处理 HTML Node
 *
 * @param {HTMLElement} element
 * @returns {string}
 */
function normalTarget(element: HTMLElement): string {
  if (!element || !element.tagName) {
    return '';
  }

  const res: any[] = [];
  const { id, className } = element;

  // 收集 标签名, ID, class
  res.push(element.tagName.toLowerCase());
  id && res.push(`#${id}`);
  if (className && Object.prototype.toString.call(className) === '[object String]') {
    for (let classes = className.split(/\s+/), i = 0; i < classes.length; i += 1) {
      // className 包含 active 的不加入路径
      const name = classes[i];
      if (name.indexOf('active') < 0) {
        res.push(`.${name}`);
      }
    }
  }
  // 收集标签指定属性
  const attrs = ['type', 'name', 'title', 'alt'];
  for (let i = 0; i < attrs.length; i += 1) {
    const attrKey = attrs[i];
    const attrValue = element.getAttribute(attrKey);
    attrValue && res.push(`[${attrKey}="${attrValue}"]`);
  }

  return res.join('');
}

/**
 * 获取元素路径, 最多保留5层
 *
 * @param {HTMLElement} element
 * @returns {string}
 */
function getElementPath(element: HTMLElement): string {
  if (!element || element.nodeType !== 1) {
    return '';
  }

  const MAX_DEEP_LENGTH = 5;
  const res = [];
  const text = element.innerText
    ? element.innerText.substr(0, 50)
    : (element as HTMLInputElement).placeholder || '-';
  res.push(`(${text})`);

  for (let target = element, deepLength = 0; deepLength < MAX_DEEP_LENGTH; deepLength += 1) {
    const ele = normalTarget(target);
    if (ele === 'html') {
      break;
    }
    res.push(ele);
    target = target.parentNode as HTMLElement;
  }

  return res.reverse().join(' > ');
}

/**
 * 监控 点击行为
 *
 * @export
 * @param {Event} event
 */
export function handleClick(event: Event): void {
  const target = (event.target || '<UNKNOWN>') as HTMLElement;

  // 过滤输入框点击 或者 带自定义埋点标识 (data-track)
  const { track } = target.dataset;
  if (['INPUT', 'TEXTAREA'].includes(target.nodeName) || track !== undefined) {
    return;
  }

  const behavior: EventBehavior = {
    type: BEHAVIOR_TYPE_MAP.UI_CLICK,
    data: {
      path: getElementPath(target),
      message: '',
    },
  };

  // DOM 节点路径不为空才不上报
  if (behavior.data.path) {
    handleBehavior(behavior);
  }
}

/**
 * 监听 输入框失去焦点时的点击行为
 *
 * @export
 * @param {Event} event
 */
export function handleBlur(event: Event): void {
  const target = (event.target || '<UNKNOWN>') as HTMLInputElement;
  if (target.nodeName !== 'INPUT' && target.nodeName !== 'TEXTAREA') {
    return;
  }

  const behavior: EventBehavior = {
    type: BEHAVIOR_TYPE_MAP.UI_BLUR,
    data: {
      path: getElementPath(target),
      message: target.value,
    },
  };

  // DOM 节点路径不为空才不上报
  if (behavior.data.path && behavior.data.message) {
    handleBehavior(behavior);
  }
}

/**
 * 自定义埋点
 * ```
 * 需要给标签设置自定义属性 data-track, 才不会触发全埋点事件. 例如:
 * <button data-track onclick="handleTrack()">自定义埋点</button>
 * ```
 *
 * @export
 * @param {string} type 事件类型名称
 * @param {{ [key: string]: any }} params 传参
 */
export function handleTrack(type: string, params: { [key: string]: any } = {}) {
  if (!type) {
    console.warn(`[${SDK_NAME}]: Empty track type!`);
  }

  const behavior: TrackBehavior = {
    type: BEHAVIOR_TYPE_MAP.TRACK,
    data: {
      type,
      params,
    },
  };
  handleBehavior(behavior);
}
