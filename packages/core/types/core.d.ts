import { BaseOptions } from '@monitor/types';
import { GlobalVal } from '@monitor/types';
import { HEALTH_TYPE_MAP } from '@monitor/types';

export declare const baseOptions: Partial<BaseOptions>;

export declare const GLOBAL_VAL: GlobalVal;

export declare function hackConsole(types?: string[], cb?: Function): void;

export declare function report(ev: any): void;

export declare function resetGlobalHealth(): void;

export declare function setGlobalHealth(type: HEALTH_TYPE_MAP.ERROR | HEALTH_TYPE_MAP.API, isSuccess?: boolean): void;

export declare function setGlobalPage(page: string): void;

export declare function setGlobalSessionID(): void;

export { }
