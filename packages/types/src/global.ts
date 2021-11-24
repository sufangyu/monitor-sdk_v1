import { Health } from './health';


/**
 * 全局值
 *
 * @export
 * @interface GlobalVal
 */
export interface GlobalVal {
  /** 当前页面 */
  page: string;
  /** session ID, 页面切换就会改变 */
  sessionID: string;
  /** 修改 session ID 时间 */
  sessionBegin: number,
  /** 健康状态统计 */
  _health: Health,
}
