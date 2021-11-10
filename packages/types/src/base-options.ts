// HTTP 请求方法
export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS';


export interface BaseOptions {
  /** 应用标识 */
  token: string;
  /** 上报 API 地址 */
  reportUrl?: string;
  /** SDK 版本 */
  version: string;
  /** 环境 */
  environment: string;
  /** 脚本延迟上报时间 */
  duration: number;
  /** 是否上报行为 */
  isBehavior: boolean;
  /** 忽略配置 */
  ignore: {
    ignoreErrors: string[];
    ignoreUrls: string[];
    ignoreApis: string[];
  };
  behavior: {
    console: string[]; // "debug"|"info"|"warn"|"log"|"error"
    click: boolean;
  },
  /** 最长上报数据长度 */
  maxLength: number,
}
