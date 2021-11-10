/** 监控指标类型 */
type KindType = '' | 'error' | 'resource' | 'api' | 'pv' | 'health' | 'performance' | 'behavior' | 'sum' | 'avg' | 'percent' | 'msg'

/**
 * 公共信息
 *
 * @export
 * @interface CommonMsg
 */
export interface CommonMsg {
  /** 监控指标类型 */
  kind: KindType;
  /** 次数 */
  times?: number;
  /** 页面 */
  page: string;
  /** 系统/应用版本 */
  version: string;
  /** 开发、生产环境 */
  env: string;
  /** 项目标识 */
  token: string;
  /** 开始时间戳 */
  begin: number;
  /** 屏幕分辨率大小 */
  screenSize: string;
  /** 终端窗口大小 */
  viewSize: string;
  /** SDK 版本 */
  _sdkVersion: string;
  /** user ID */
  uid: string;
  /** session ID */
  sid: string;
  /** 网络类型 */
  network: string;
  /** 语言 */
  language: string;
  /** 原始 URL */
  origin: string;
}


/**
 * 错误信息
 *
 * @export
 * @interface ErrorMsg
 * @extends {CommonMsg}
 */
export interface ErrorMsg extends CommonMsg {
  /** 错误类型 */
  errorType: 'resource' | 'caughterror' | 'promise';
  /** 信息 */
  msg: string;
  /** 类别 */
  cate?: string;
  /** 错误栈 或 出错标签 */
  detail?: string;
  /** 出错文件 */
  file?: string;
  /** 行 */
  line?: number;
  /** 列 */
  col?: number;
  /** 标签名 */
  tagName?: string;
  /** */
  stack?: string;
}
