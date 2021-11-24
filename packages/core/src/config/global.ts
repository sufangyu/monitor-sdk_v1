import { generateUID } from '@monitor/utils';
import { GlobalVal, HEALTH_TYPE_MAP } from '@monitor/types';

/** 全局数据缓存 */
export const GLOBAL_VAL: GlobalVal = {
  page: '',
  sessionID: '',
  sessionBegin: Date.now(),
  _health: {
    errorCount: 0,
    apiSuccess: 0,
    apiFail: 0,
  },
};

/**
 * 设置全局的当前页面
 *
 * @export
 * @param {string} page
 */
export function setGlobalPage(page: string) {
  GLOBAL_VAL.page = page;
  console.log('GLOBAL_VAL =>>', GLOBAL_VAL);
}

/**
 * 设置全局的 session 信息
 *
 * @export
 */
export function setGlobalSessionID() {
  GLOBAL_VAL.sessionID = generateUID();
  GLOBAL_VAL.sessionBegin = Date.now();
}

/**
 * 设置全局的健康状态统计
 *
 * @export
 * @param {string} type
 * @param {boolean} [isSuccess]
 */
export function setGlobalHealth(
  type: HEALTH_TYPE_MAP.ERROR | HEALTH_TYPE_MAP.API,
  isSuccess?: boolean,
) {
  switch (type) {
    case HEALTH_TYPE_MAP.ERROR:
      GLOBAL_VAL._health.errorCount += 1;
      break;
    case HEALTH_TYPE_MAP.API:
      // eslint-disable-next-line no-unused-expressions
      isSuccess
        ? GLOBAL_VAL._health.apiSuccess += 1
        : GLOBAL_VAL._health.apiFail += 1;
      break;
    default:
  }
}

/**
 * 重置全局的健康状态统计
 *
 * @export
 */
export function resetGlobalHealth() {
  GLOBAL_VAL._health = {
    errorCount: 0,
    apiSuccess: 0,
    apiFail: 0,
  };
}
