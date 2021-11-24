export declare interface ApiMsg extends CommonMsg {
    url: string;
    success: boolean;
    delay: number;
    status: number;
    msg: string;
    begin: number;
    requestInfo?: RequestBaseInfo;
}

export declare interface BaseOptions {
    token: string;
    reportUrl?: string;
    version: string;
    environment: string;
    duration: number;
    ignore: {
        ignoreErrors: string[];
        ignoreUrls: string[];
        ignoreApis: string[];
    };
    enableBehavior: boolean;
    behavior: {
        console: string[];
        click: boolean;
    };
    maxLength: number;
}

export declare type Behavior = NavigationBehavior | ConsoleBehavior | EventBehavior | TrackBehavior;

export declare enum BEHAVIOR_TYPE_MAP {
    NAVIGATION = "navigation",
    CONSOLE = "console",
    UI_CLICK = "ui.click",
    UI_BLUR = "ui.blur",
    TRACK = "TRACK"
}

export declare interface BehaviorMsg extends CommonMsg {
    behavior: Behavior;
}

export declare interface CommonMsg {
    kind: KIND_TYPES;
    times?: number;
    page: string;
    version: string;
    env: string;
    token: string;
    begin: number;
    screenSize: string;
    viewSize: string;
    _sdkVersion: string;
    uid: string;
    sid: string;
    network: string;
    language: string;
    origin: string;
}

export declare interface ConsoleBehavior {
    type: BEHAVIOR_TYPE_MAP.CONSOLE;
    data: {
        level: string;
        message: string;
    };
}

export declare enum ERROR_TYPE_MAP {
    RESOURCE = "RESOURCE",
    CAUGHT_ERROR = "CAUGHT_ERROR",
    PROMISE = "PROMISE"
}

export declare interface ErrorMsg extends CommonMsg {
    errorType: keyof typeof ERROR_TYPE_MAP;
    msg: string;
    cate?: string;
    detail?: string;
    file?: string;
    line?: number;
    col?: number;
    tagName?: string;
    stack?: string;
}

export declare interface EventBehavior {
    type: BEHAVIOR_TYPE_MAP.UI_CLICK | BEHAVIOR_TYPE_MAP.UI_BLUR;
    data: {
        path: string;
        message: string;
    };
}

export declare interface GlobalVal {
    page: string;
    sessionID: string;
    sessionBegin: number;
    _health: Health;
}

export declare interface Health {
    errorCount: number;
    apiSuccess: number;
    apiFail: number;
}

export declare enum HEALTH_TYPE_MAP {
    ERROR = "ERROR",
    API = "API"
}

export declare interface HealthMsg extends CommonMsg, Health {
    healthy: 'YES' | 'NO';
    stay: number;
}

export declare type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS';

export declare enum KIND_MAP {
    ERROR = "ERROR",
    RESOURCE = "RESOURCE",
    API = "API",
    PV = "PV",
    HEALTH = "HEALTH",
    PERFORMANCE = "PERFORMANCE",
    BEHAVIOR = "BEHAVIOR",
    SUM = "SUM",
    AVG = "AVG",
    PERCENT = "PERCENT",
    MESSAGE = "MESSAGE",
    UNKNOWN = "UNKNOWN"
}

export declare type KIND_TYPES = keyof typeof KIND_MAP;

export declare interface NavigationBehavior {
    type: BEHAVIOR_TYPE_MAP.NAVIGATION;
    data: {
        from: string;
        to: string;
    };
}

export declare interface PageViewMsg extends CommonMsg {
    title: string;
    href: string;
    referrer: string;
    dpr: number;
    charset: string;
}

export declare interface PerformanceMsg extends CommonMsg {
    dnsTime: number;
    tcpTime: number;
    sslTime: number;
    ttfbTime: number;
    responseTime: number;
    domTime: number;
    resourceTime: number;
    domReadyTime: number;
    firstPaintTime: number;
    timeToInteract: number;
    loadTime: number;
}

export declare interface RequestBaseInfo {
    method?: string;
    headers?: {
        [key: string]: any;
    };
    data?: BodyInit | string | null;
}

export declare interface ResourceMsg extends CommonMsg {
    dom: number;
    load: number;
    resources?: PerformanceEntry[];
}

export declare interface TrackBehavior {
    type: BEHAVIOR_TYPE_MAP.TRACK;
    data: {
        type: string;
        params: {
            [key: string]: any;
        };
    };
}

export { }
