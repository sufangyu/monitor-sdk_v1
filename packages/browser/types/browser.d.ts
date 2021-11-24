import { BaseOptions } from '@monitor/types';

declare interface BrowserBaseOptions {
    autoSendPV: boolean;
    enableSPA: boolean;
    enableError?: boolean;
    enableXHR?: boolean;
    enableRecord?: boolean;
    enablePerformance?: boolean;
    enableResource?: boolean;
}

export declare class BrowserClient {
    constructor(options: BrowserOptions);
    run(): void;
    addListenRouterChange(): void;
    removeListenRouterChange(): void;
    private addListenJS;
    private removeListenJS;
    private addListenPerformance;
    private addListenBehavior;
    private addListenClick;
    private removeListenClick;
    private addListenResource;
    private addListenNetworkRequest;
    private addListenRecordWeb;
    addListenUnload(): void;
    private destroy;
}

declare interface BrowserOptions extends BrowserBaseOptions, BaseOptions {
}

export declare function createBrowserInstance(options: BrowserOptions): BrowserClient;

export declare const init: typeof createBrowserInstance;

export { }
