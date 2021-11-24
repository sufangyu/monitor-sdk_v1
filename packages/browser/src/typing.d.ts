interface Window {
  MONITOR: any;
  XMLHttpRequest: any;
  __oXMLHttpRequest__: any;
  fetch: any;
  __oFetch__: any;

  __oOnpopstate__: any;
  // axios: any;
  // __oAxios__: any;
}

interface HTMLStyleElement {
  styleSheet: {
    cssText: string
  }
}

// 处理自定义事件的报错
interface WindowEventMap {
  historystatechange: CustomEvent,
}
