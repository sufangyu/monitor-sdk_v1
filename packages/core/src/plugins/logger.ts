import { ConsoleBehavior, BEHAVIOR_TYPE_MAP } from '@monitor/types';

/**
 * 增强 console
 *
 * @export
 */
export function hackConsole(types: string[] = [], cb?: Function): void {
  if (!(window && window.console)) {
    return;
  }

  for (let i = 0; i < types.length; i += 1) {
    const type = types[i] as ('log' | 'error' | 'warn' | 'info' | 'debug');
    const action = window.console[type];
    if (!action || !['log', 'error', 'warn', 'info', 'debug'].includes(type)) {
      return;
    }

    (function (_type, _action) {
      window.console[type] = function () {
        // eslint-disable-next-line prefer-rest-params
        const msg = Array.prototype.slice.apply(arguments);
        const logBehavior: ConsoleBehavior = {
          type: BEHAVIOR_TYPE_MAP.CONSOLE,
          data: {
            level: _type,
            message: JSON.stringify(msg),
          },
        };

        cb && cb(logBehavior);

        // eslint-disable-next-line prefer-spread
        _action && _action.apply(null, msg);
      };
    }(type, action));
  }
}
