import { BrowserClient } from './browser-client';
import { BrowserOptions } from './types';

function createBrowserInstance(options: BrowserOptions) {
  const browserClient = new BrowserClient(options);
  return browserClient;
}

const init = createBrowserInstance;
export { createBrowserInstance, init, BrowserClient };
