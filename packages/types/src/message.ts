import { Behavior } from "./behavior";

/** 监控指标类型枚举 */
export enum KIND_MAP {
  /** 错误指标 */
  ERROR ='ERROR',
  /** 资源指标 */
  RESOURCE ='RESOURCE',
  /** 接口指标 */
  API ='API',
  /** 页面访问指标 */
  PV ='PV',
  /** 页面健康状态指标 */
  HEALTH ='HEALTH',
  /** 性能指标 */
  PERFORMANCE ='PERFORMANCE',
  /** 行为指标 */
  BEHAVIOR ='BEHAVIOR',
  SUM ='SUM',
  AVG ='AVG',
  PERCENT ='PERCENT',
  MESSAGE ='MESSAGE',
  /** 未知类型 */
  UNKNOWN ='UNKNOWN',
}
/** 监控指标类型 */
export type KIND_TYPES = keyof typeof KIND_MAP;


/** 请求基础信息 */
export interface RequestBaseInfo {
  /** 请求方法 */
  method?: string;
  /** 请求头 */
  headers?: {[key: string]: any};
  /** 请求参数 */
  data?: BodyInit | string | null;
}


/**
 * 公共信息
 *
 * @export
 * @interface CommonMsg
 */
export interface CommonMsg {
  /** 监控指标类型 */
  kind: KIND_TYPES;
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


/** 错误的具体类型 */
export enum ERROR_TYPE_MAP {
  /** 资源错误 */
  RESOURCE ='RESOURCE',
  /** 语法错误 */
  CAUGHT_ERROR ='CAUGHT_ERROR',
  /** Promise 异步错误 */
  PROMISE ='PROMISE',
}


/**
 * 错误信息
 *
 * @export
 * @interface ErrorMsg
 * @extends {CommonMsg}
 */
export interface ErrorMsg extends CommonMsg {
  /** 报错类型 */
  errorType: keyof typeof ERROR_TYPE_MAP;
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


/**
 * 接口信息
 *
 * @export
 * @interface ApiMsg
 * @extends {CommonMsg}
 */
export interface ApiMsg extends CommonMsg {
  /** API 接口地址 */
  url: string;
  /** 请求成功? */
  success: boolean;
  /** 请求响应时间 */
  delay: number;
  /** 请求响应状态 */
  status: number;
  /** 请求响应信息 */
  msg: string;
  /** 请求发起时间 */
  begin: number;
  /** 请求信息 */
  requestInfo?: RequestBaseInfo;
}


/**
 * 页面性能信息
 *
 * @export
 * @interface PerformanceMsg
 * @extends {CommonMsg}
 */
export interface PerformanceMsg extends CommonMsg {
  /** DNS 解析耗时 (domainLookupEnd - domainLookupStart) */
  dnsTime: number;
  /** TPC 连接耗时 (connectEnd - connectStart) */
  tcpTime: number;
  /** SSL安全连接耗时 (connectEnd - secureConnectionStart) */
  sslTime: number;
  /** 首字节到达时间 - Time to First Byte (responseStart - requestStart) */
  ttfbTime: number;
  /** 内容响应耗时 (responseEnd - responseStart) */
  responseTime: number;
  /** DOM 解析耗时 (domInteractive - responseEnd) */
  domTime: number;
  /** 资源加载耗时 (loadEventStart - domContentLoadedEventEnd) */
  resourceTime: number;
  /** DOM Ready时间 (domContentLoadedEventEnd - fetchStart) */
  domReadyTime: number;
  /**
   * 首次渲染时间 => 白屏时间 (responseEnd - fetchStart)
   * ```
   * 从请求开始到浏览器开始解析第一批HTML文档字节的时间差
   * ```
  */
  firstPaintTime: number;
  /**
   * 首次可交互时间 (domInteractive - fetchStart)
   * ```
   * 浏览器完成所有HTML解析并且完成DOM构建，此时浏览器开始加载资源
   * ```
  */
  timeToInteract: number;
  /**
   * 完整的加载时间 (loadEventStart - fetchStart)
   * ```
   * Load = 首次渲染时间 + DOM解析耗时 + 同步JS执行 + 资源加载耗时
   * ```
  */
  loadTime: number;
}


/**
 * 行为上报
 *
 * @export
 * @interface BehaviorMsg
 * @extends {CommonMsg}
 */
export interface BehaviorMsg extends CommonMsg{
  behavior: Behavior;
}


/**
 * 资源加载信息
 *
 * @interface ResourceMsg
 * @extends {CommonMsg}
 */
export interface ResourceMsg extends CommonMsg {
  /** DOM 解析耗时. domInteractive - responseEnd */
  dom: number;
  /** 首屏加载时间. loadEventStart- fetchStart */
  load: number;
  /** 加载的资源 */
  resources?: PerformanceEntry[];
}


/**
 * PV 上报
 *
 * @export
 * @interface PageViewMsg
 * @extends {CommonMsg}
 */

export interface PageViewMsg extends CommonMsg{
  /** title */
  title: string;
  /** 页面 URL */
  href: string;
  /** 来源 */
  referrer: string;
  /** dpr */
  dpr: number;
  /** document 编码 */
  charset: string;
}
