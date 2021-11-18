export enum BEHAVIOR_TYPE_MAP {
  /** 导航 */
  NAVIGATION = 'navigation',
  /** 控制台日志 */
  CONSOLE = 'console',
  /** 界面点击 */
  UI_CLICK = 'ui.click',
  /** 界面点击 (输入框失焦) */
  UI_BLUR = 'ui.blur',
  /** 自定义事件 */
  TRACK = 'TRACK',
}

// 导航行为
export interface NavigationBehavior {
  type: BEHAVIOR_TYPE_MAP.NAVIGATION,
  data: {
    from: string,
    to: string,
  },
}


// 控制台行为
export interface ConsoleBehavior {
  type: BEHAVIOR_TYPE_MAP.CONSOLE,
  data: {
    level: string,
    message: string,
  },
}


// 事件行为
export interface EventBehavior {
  type: BEHAVIOR_TYPE_MAP.UI_CLICK | BEHAVIOR_TYPE_MAP.UI_BLUR,
  data: {
    path: string,
    message: string,
  },
}


// 自定义埋点行文
export interface TrackBehavior {
  type: BEHAVIOR_TYPE_MAP.TRACK,
  data: {
    type: string,
    params: { [key: string]: any },
  },
}

export type Behavior = NavigationBehavior | ConsoleBehavior | EventBehavior | TrackBehavior;
