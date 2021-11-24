import { CommonMsg } from "./message";

/**
 * 健康状态类型
 *
 * @export
 * @enum {number}
 */
export enum HEALTH_TYPE_MAP {
  /** 错误 */
  ERROR = 'ERROR',
  /** API */
  API = 'API',
}


/**
 * 健康状态统计
 *
 * @export
 * @interface Health
 */
export interface Health {
  /** error 次数 */
  errorCount: number;
  /* API 成功次数 */
  apiSuccess: number;
  /** API 错误次数 */
  apiFail: number;
}


/**
 * 健康检查上报信息
 *
 * @interface HealthMsg
 * @extends {CommonMsg}
 * @extends {Health}
 */
export interface HealthMsg extends CommonMsg, Health {
  /** 健康的 */
  healthy: 'YES' | 'NO';
  /** 停留时间 */
  stay: number;
}
